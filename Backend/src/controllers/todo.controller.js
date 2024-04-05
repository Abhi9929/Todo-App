import { asyncHandler } from "../utils/asyncHandler.js";
import zod, { string } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

const getTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const todos = await Todo.find({
    creater: userId,
  });
  if (!todos) {
    throw new ApiError(411, "Invalid User");
  }

  return res.json(new ApiResponse(200, todos, "All todos"));
});

const todoschema = zod.object({
  title: zod.string().min(1),
  completed: zod.boolean().optional().default(false),
});
const createTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { success } = todoschema.safeParse({
    title: req.body.title,
    completed: req.body.completed,
  });
  if (!success) {
    throw new ApiError(401, "Invalid format");
  }

  const todo = await Todo.create({
    title: req.body.title,
    completed: false,
    creater: userId,
  });

  return res.json(new ApiResponse(200, todo, "todo created successfully"));
});

const updateschema = zod.object({
  _id: zod.string(),
  title: zod.string().min(1).optional(),
  completed: zod.boolean().optional(),
});
const updateTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { _id, title, completed } = req.body;

  const { success } = updateschema.safeParse({
    _id,
    title,
    completed,
  });
  if (!success) {
    throw new ApiError(401, "Invalid format");
  }

  const updateFields = { title };

  if (completed !== undefined) {
    updateFields.completed = !completed;
  }
  const updatedTodo = await Todo.findOneAndUpdate(
    {
      $and: [{ creater: userId }, { _id }],
    },
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  ).select("-creater -accessToken");
  if (!updatedTodo) {
    throw new ApiError(401, "Unable to update");
  }
  return res.json(new ApiResponse(200, updatedTodo, "Todo updated"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.body._id);

  const userId = req.user._id;

  const remainingTodos = await Todo.find({
    creater: userId,
  }).select("-accessToken -creater");
  if (!remainingTodos) {
    throw new ApiError(401, "Error occurs while fetching todos");
  }

  return res.json(new ApiResponse(200, remainingTodos, "Remaining todos"));
});

export { getTodos, createTodo, updateTodo, deleteTodo };

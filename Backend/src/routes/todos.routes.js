import { Router } from "express";
// import { signUpUser, loginUser, logoutUser } from "../controllers/todos.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
const router = Router();


router.route('/todos').get(verifyJWT, getTodos)
router.route('/todos/create').post(verifyJWT, createTodo)
router.route('/todos/update').put(verifyJWT, updateTodo)
router.route('/todos/delete').post(verifyJWT, deleteTodo)


export default router
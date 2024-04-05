import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
const app = express();

import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todos.routes.js";
import { ApiError } from "./utils/ApiError.js";

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());
app.use(cors({credentials: true}));


app.use('/api/users/', userRouter)
app.use('/api/user/', todoRouter)


// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        message: err.message,
        errors: err.errors, // Optional: Include detailed error details if needed
      });
    } else {
      // Handle unknown errors (e.g., logging, sending generic error messages)
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    next();
  });
export default app;
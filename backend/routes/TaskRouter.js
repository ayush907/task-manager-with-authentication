import express from "express"
import { taskMiddleware } from "../middlewares/TaskMiddleware.js";
import { createTasks, deleteTasks, fetchTasks, updateTasks } from "../controllers/TaskController.js";
const router = express.Router();

router.get("/", taskMiddleware, fetchTasks)

router.post("/", taskMiddleware, createTasks)

router.put("/:id", taskMiddleware, updateTasks)

router.delete("/:id", taskMiddleware, deleteTasks)


export default router;
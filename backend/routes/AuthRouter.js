import express from "express"
const router = express.Router()
import { ControlSignUp, ControlLogIn } from "../controllers/Authcontroller.js"
import { LogInMiddleware, SignUpMiddleware } from "../middlewares/AuthMiddleware.js"

router.post("/signup",SignUpMiddleware, ControlSignUp)
router.post("/login",LogInMiddleware, ControlLogIn)

export default router
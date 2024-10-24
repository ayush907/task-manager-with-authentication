import express from "express"
import cors from "cors"
import AuthRouter from "./routes/AuthRouter.js"
import TaskRouter from "./routes/TaskRouter.js"
import cookieParser from "cookie-parser";
import "./Models/ConnAuth.js"
import "./Models/ConnTask.js"

import dotenv from 'dotenv';
dotenv.config();


const app = express() 
const port = 3000

// app.use(bodyParser())    body parser ab deprecated ho gaya hai esliye ab express.json() use karne chahiye.
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',    // frontend URL
    credentials: true,
}));


app.use("/auth", AuthRouter)
app.use("/tasks", TaskRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.TASK_DB_URI;

const taskConnection = mongoose.createConnection(uri);

taskConnection.once('open', () => {
    const dbName = taskConnection.name;
    console.log(`Connected to MongoDB with database ${dbName}`);
});

taskConnection.on('error', (err) => {
    console.error(`Error connecting to TASK-BASE: ${err}`);
})

export default taskConnection;


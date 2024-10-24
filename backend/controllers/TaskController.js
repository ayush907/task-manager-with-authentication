
import TaskUserModel from "../Models/TaskUser.js"

// for creating the tasks
export const createTasks = async (req, res) => {
    const data = req.body
    const userId = req.user.userId;
    try {
        const newTask = new TaskUserModel({...data,userId})
        await newTask.save()
        res.status(201).json({ message: "Task created successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Error creating task", success: false })
    }
}


// for getting the tasks
export const fetchTasks = async (req, res) => {
    try {
        console.log(req.user)
        const userId = req.user.userId;
        const data = await TaskUserModel.find({userId})
        res.status(200).json({ message: "Tasks fetched successfully", success: true, data })
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", success: false })
    }
}


// for updating the tasks
export const updateTasks = async (req, res) => {
    try {
        const taskId = req.params.id
        const userId = req.user.userId;

        const task = await TaskUserModel.findOne({ _id: taskId, userId }); // User ID check karein
        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        const data = req.body
        const obj = {$set:{...data}}
        await TaskUserModel.findByIdAndUpdate(taskId, obj)
        res.status(200).json({ message: "Task updated successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Error updating task", success: false })
    }
}


// for deleting the tasks
export const deleteTasks = async (req, res) => {
    try {
        const taskId = req.params.id
        const userId = req.user.userId;

        const task = await TaskUserModel.findOne({ _id: taskId, userId }); // User ID check karein
        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        await TaskUserModel.findByIdAndDelete(taskId)
        res.status(200).json({ message: "Task deleted successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", success: false })
    }
}
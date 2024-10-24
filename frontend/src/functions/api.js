import { API_URI } from "./utils"


export const createTask = async (taskObj) => {
    try {
        const uri = `${API_URI}/tasks`
        const result = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(taskObj)
        })

        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}


export const fetchTask = async () => {
    try {
        const uri = `${API_URI}/tasks`
        const result = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}


export const updateTask = async (id, taskObj) => {
    try {
        const uri = `${API_URI}/tasks/${id}`
        const result = await fetch(uri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(taskObj)
        })

        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async(id)=>{
    try {
        const uri = `${API_URI}/tasks/${id}`
        const result = await fetch(uri, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}



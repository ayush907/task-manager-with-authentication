import { toast } from "react-toastify"

export const notify =(message,type)=>{
    toast[type](message);
}

export const API_URI = "http://localhost:3000" 
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.AUTH_DB_URI;

mongoose.connect(uri)
.then((connection)=>{
    const dbName = connection.connections[0].name
    console.log(`connected to MongoDB with database ${dbName}`)
})
.catch((err)=>{
    console.log(err)
})

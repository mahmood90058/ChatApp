import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import UserRoute from "./routes/user.js"
import MassageRoute from "./routes/massage.route.js"

import cookieParser from "cookie-parser";
import cors from "cors"
import { app, server } from "./socketIo/server.js";
// const app= express();

dotenv.config();

app.use(express.json())
app.use(cors())
app.use(cookieParser());

const URI= process.env.MONGODB_URL;
const PORT = process.env.PORT || 3001;
try{
    mongoose.connect(URI)
    console.log("connecte to mongodb")
}catch(err){
    console.log(err)
}

app.use("/api/user",UserRoute)
app.use("/api/message",MassageRoute)


// app.listen(PORT, ()=>{
//     console.log(`Server is Running on port ${PORT}`)
// })

// socket io server ka use kr rhe

server.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`)
})


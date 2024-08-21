import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js";
const server = express();
dotenv.config()


connectDB();

server.get("/", (req,res)=>{
    res.send("Hello")
})

server.listen(process.env.PORT, ()=>{
    console.log(`Server Running on ${process.env.PORT}`)
})
import express from "express"
import dotenv from "dotenv"
const server = express();
dotenv.config()

server.get("/", (req,res)=>{
    res.send("Hello")
})

server.listen(process.env.PORT, ()=>{
    console.log(`Server Running on ${process.env.PORT}`)
} )
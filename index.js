require("dotenv").config()
const express=require('express')
const cors=require('cors')
require('./config/connection')
const router=require('./routes/router')

const cookpediaServer=express()

cookpediaServer.use(cors())
cookpediaServer.use(express.json())
cookpediaServer.use(router)

const PORT=3000 || process.env.PORT


cookpediaServer.listen(PORT,()=>{
    console.log(`cookpedia Server started running and waiting for clent request`);
})

cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>cookpedia Server started running : ${PORT} and waiting for clent request</h1>`)
})
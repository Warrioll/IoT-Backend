import express from "express";
import 'dotenv/config';
import auth from 'express-basic-auth';
import { Request, Response } from 'express';
import { mqttClient } from "./mqttClient";
import { switchToggle } from "./controlers/switchController";
import { logIn, checkIfLoggedIn } from "./controlers/auth";
import cookieParser from 'cookie-parser'
import cors from "cors";
import mongoose from "mongoose";




const app = express();
const PORT = process.env.PORT;
const DBURL = process.env.DB_URL as string;
 
 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 
}));
app.use(cookieParser())
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now()

  console.log('START', req.method, req.url)

  res.on('finish', () => {
    console.log(
      'END',
      req.method,
      req.url,
      Date.now() - start + 'ms'
    )
  })

  next()
})
 


const connectToDatabase = async () =>{
    for(let i=0; i<10 ; i++){
        try{
             console.log('Trying to connect to database... ')
              mongoose.connection.on('error', (error: Error)=> console.log(error));
            await mongoose.connect(DBURL, {tls: true});
            
           
            console.log('Connected to database successfully')
            return
             
        }catch(e){
            console.log('Connection to database failed: ', e)
            await new Promise(resume => setTimeout(resume, 5000));
        }

          
    }
    throw new Error('Cannot establish connection to database!')
}

app.get("/", (req, res) => {
  mqttClient.publish('my/test/topic', 'TEST!');
  res.send("It's alive!!!");
});

app.post('/login',logIn);

app.put("/switch/:id",switchToggle);
app.get('/isLoggedIn',checkIfLoggedIn );

connectToDatabase().then(()=>{
    app.listen(PORT, ()=> console.log("Listening on port ", PORT))
})

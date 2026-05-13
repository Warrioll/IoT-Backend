import express from "express";
import 'dotenv/config';
import auth from 'express-basic-auth';
import { Request, Response } from 'express';
import { mqttClient } from "./mqttClient";
import { switchToggle } from "./controlers/switch";
import { logIn, checkIfLoggedIn } from "./controlers/auth";
import cookieParser from 'cookie-parser'
import cors from "cors";




const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());



 const pass = process.env.APP_PASS as string;
   const username = process.env.APP_USERNAME as string;

// app.use(auth({
//     users: { [username]: pass },
//     challenge: true
// }));

app.get("/", (req, res) => {
  mqttClient.publish('my/test/topic', 'TEST!');
  res.send("It's alive!!!");
});

app.post('/login',logIn);

app.put("/switch/:id",switchToggle);
app.get('/isLoggedIn',checkIfLoggedIn );

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
}); 
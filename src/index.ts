import express from "express";
import 'dotenv/config';
import auth from 'express-basic-auth';
import { Request, Response } from 'express';
import { mqttClient } from "./mqttClient";
import { switchToggle } from "./controlers/switch";



const app = express();
const port = process.env.PORT;



 const pass = process.env.APP_PASS as string;
   const username = process.env.APP_USERNAME as string;

app.use(auth({
    users: { [username]: pass },
    challenge: true
}));

app.get("/", (req, res) => {
  mqttClient.publish('my/test/topic', 'Wawaa');
  res.send("Hello World!");

  console.log("Response sent");
});

app.get("/switch/:action",switchToggle);

app.listen(port, () => {
  console.log(`Example app lis tening on pooort ${port}`);
}); 
import { mqttClient } from "../mqttClient"
import { Request, Response } from 'express';
import { verifyAccess } from "./auth";

export const switchToggle = (req: Request, res: Response)=>{
   verifyAccess(req, res, ()=>{
      const { id} = req.params;
      const {mode} = req.body;
     if(mode==='OFF'){
        mqttClient.publish(`kn/switch/${id.toString()}`, "OFF");
        res.sendStatus(200);
     }else if(mode==='ON'){
        mqttClient.publish(`kn/switch/${id.toString()}`, "ON");
        res.sendStatus(200);
     } else{
        res.sendStatus(422);
     }
   })
     
    
}
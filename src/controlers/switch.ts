import { mqttClient } from "../mqttClient"
import { Request, Response } from 'express';

export const switchToggle = (req: Request, res: Response)=>{
     const { action} = req.params;
     if(action==='OFF'){
        mqttClient.publish('kn/switch', "OFF");
        res.sendStatus(200);
     }else if(action==='ON'){
        mqttClient.publish('kn/switch', "ON");
        res.sendStatus(200);
     } else{
        res.sendStatus(422);
     }
    
}
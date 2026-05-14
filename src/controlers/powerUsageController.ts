import { powerUsageModel } from "../models/powerUsageModel";

export const postPowerUsageData  = async(value:number)=>{

    try {
       const powerUsageData = {
        value: value,
        time: new Date(Date.now())
       }
    
    const powerUsageRecord = new powerUsageModel(powerUsageData);
    powerUsageRecord.save();
    } catch (error) {
        
    }
}
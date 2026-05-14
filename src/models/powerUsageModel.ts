import mongoose from "mongoose";

const powerUsageSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    time: {type: Date}
})

export const powerUsageModel = mongoose.model('PowerUsage', powerUsageSchema, 'PowerUsage');
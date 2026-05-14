import mqtt from "mqtt";
import 'dotenv/config';
import { postPowerUsageData } from "./controlers/powerUsageController";

let options = {
    host: process.env.BROKER_URL,
    port: Number(process.env.BROKER_PORT),
    protocol: 'mqtts' as const,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASS
}


export const createMqttClient = ()=>{

const client = mqtt.connect(options);


client.on('connect', function () {
    console.log('Connected to MQTT Broker');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
    if(topic==='kn/powerUsage'){
        console.log(message.toString());
        postPowerUsageData(Number(message.toString()))
    }
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');
client.subscribe('kn/powerUsage');

// publish message 'Hello' to topic 'my/test/topic'
//client.publish('my/test/topic', 'Hello');
return client

}

export const mqttClient = createMqttClient();

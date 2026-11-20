const mqtt = require("mqtt");

const BROKER_URL = "mqtt://broker.hivemq.com";
const TOPIC = "smart-basket/smart-laundry-basket/energy/data";

const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10_000,
  reconnectPeriod: 2_000,
});

client.on("connect", () => {
  console.log("✅ Subscriber connected:", BROKER_URL);

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error("❌ Subscribe error:", err.message);
    } else {
      console.log("👂 Listening on topic:", TOPIC);
    }
  });
});

client.on("message", (topic, message) => {
  console.log("📥 Received:", message.toString());

  const payloads = JSON.parse(message.toString())
  const humidityData = payloads.find(data => data.deviceId === "DHT11")
  const weightData = payloads.find(data => data.deviceId === "HX711")
  const gasData = payloads.find(data => data.deviceId === "MQ-135")

  let displayMessage = "Continue Monitoring";
  if(humidityData.humidity > 50 && weightData.weight > 4.5 && gasData.gas > 2045) {
    displayMessage = "⚠️ Laundry Required ⚠️"
  }

  console.log(displayMessage)
  

});

client.on("error", (err) => console.error("❌ MQTT error:", err.message));
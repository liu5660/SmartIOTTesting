const mqtt = require("mqtt");

// Public broker (easy for learning)
const BROKER_URL = "mqtt://broker.hivemq.com";

// Use a specific topic to avoid conflicts with other users
const TOPIC = "smart-basket/smart-laundry-basket/energy/data";

const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10_000,
  reconnectPeriod: 2_000,
});

client.on("connect", () => {
  console.log("✅ Sensor connected to MQTT broker:", BROKER_URL);

  setInterval(() => {
    const payload = [
      {
        deviceId: "DHT11",
        humidity: Math.floor(Math.random() * 100) + 1, // 1..100
        timestamp: new Date().toISOString(),
      },
      {
        deviceId: "HX711",
        weight: Number(Math.round((Math.random() * 10)).toFixed(2)),
        timestamp: new Date().toISOString()
      },
      {
        deviceId: "MQ-135",
        gas: Math.floor(Math.random() * 5000) + 1,
        timestamp: new Date().toISOString()
      }
    ];

    const message = JSON.stringify(payload);

    client.publish(TOPIC, message, { qos: 0 }, (err) => {
      if (err) {
        console.error("❌ Publish error:", err.message);
      } else {
        console.log("📤 Published:", message);
      }
    });
  }, 5000);
});

client.on("reconnect", () => console.log("🔄 Reconnecting..."));
client.on("error", (err) => console.error("❌ MQTT error:", err.message));
client.on("close", () => console.log("🔌 Connection closed"));
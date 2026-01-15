const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

// shared memory
let latestESP32Data = null;

// Home test
app.get("/", (req, res) => {
    res.send("ESP32 Server Running");
});

// ESP32 sends data every 5 seconds
app.post("/esp32", (req, res) => {
    latestESP32Data = {
        ...req.body,
        updatedAt: Date.now()
    };

    console.log("ESP32 Data:", latestESP32Data);

    res.json({ status: "success" });
});

// Dashboard reads data
app.get("/dashboard", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.json({
        data: latestESP32Data,
        serverTime: Date.now()
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require("express");
const cors = require("cors"); 
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

// Shared memory
let latestESP32Data = null;

// Home test
app.get("/", (req, res) => {
    res.send("ESP32 Server Running");
});

// ESP32 posts data
app.post("/esp32", (req, res) => {
    latestESP32Data = {
        ...req.body,
        updatedAt: Date.now(),
    };
    res.json({ status: "success" });
});

// SSE endpoint
app.get("/dashboard/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*"); 

    if (latestESP32Data) {
        res.write(`data: ${JSON.stringify(latestESP32Data)}\n\n`);
    }

    const interval = setInterval(() => {
        if (latestESP32Data) {
            res.write(`data: ${JSON.stringify(latestESP32Data)}\n\n`);
        }
    }, 500);

    req.on("close", () => clearInterval(interval));
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

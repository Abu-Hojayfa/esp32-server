# Vehicle Safety Monitoring System

This project consists of a **Node.js/Express Backend** (this repository) and a **React Frontend Dashboard**. The system collects real-time telemetry data from an ESP32 device and streams it to a web dashboard for live monitoring of driver safety metrics.

---

## 🏗️ Backend Server (This API)

This server acts as the bridge between the ESP32 hardware and the frontend dashboard. It receives POST requests from the hardware and streams the data to connected clients using Server-Sent Events (SSE).

### ⚙️ Prerequisites
* **Node.js** (v14 or higher)
* **npm**

### 🚀 Installation & Setup

1.  **Initialize the project:**
    ```bash
    npm init -y
    ```

2.  **Install dependencies:**
    ```bash
    npm install express cors
    ```

3.  **Run the server:**
    ```bash
    node index.js
    ```
    *The server will start on `http://localhost:3000`*

### 📡 API Endpoints

#### 1. Server Health Check
* **URL:** `/`
* **Method:** `GET`
* **Response:** `ESP32 Server Running`

#### 2. Upload Data (From ESP32)
The ESP32 sends vehicle status updates to this endpoint.

* **URL:** `/esp32`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body Format:**
    ```json
    {
      "eyeDrowsy": false,      // boolean: true if driver is drowsy
      "steerInactive": true,   // boolean: true if steering is inactive
      "rpm": "5000",           // string/number: engine RPM
      "rolloverDetected": false // boolean: true if rollover risk detected
    }
    ```
* **Response:** `{"status": "success"}`

#### 3. Stream Data (To Dashboard)
The frontend connects here to receive live updates via SSE.

* **URL:** `/dashboard/stream`
* **Method:** `GET`
* **Update Interval:** 500ms
* **Stream Format:**
    ```text
    data: {"eyeDrowsy":false,"steerInactive":true,"rpm":"5000","rolloverDetected":false,"updatedAt":1705912345678}
    ```

---

## 🖥️ Frontend Dashboard

The visualization interface for this system is located in a separate repository. It is a React application built with Vite and TailwindCSS.

* **Repository:** [Abu-Hojayfa/driving_safety_dashboard](https://github.com/Abu-Hojayfa/driving_safety_dashboard)

### 🔌 How to Connect Frontend to This Backend

To use the frontend dashboard with this local backend server:

1.  **Clone the frontend repository:**
    ```bash
    git clone [https://github.com/Abu-Hojayfa/driving_safety_dashboard.git](https://github.com/Abu-Hojayfa/driving_safety_dashboard.git)
    cd driving_safety_dashboard
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure the API URL:**
    Create a `.env` file in the root of the **frontend** project and add the following line to point to your local server:
    ```env
    VITE_API_URL=http://localhost:3000/dashboard/stream
    ```
    *(If you don't create this file, the frontend may default to a cloud URL or fail to connect).*

4.  **Run the Dashboard:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
   

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

---

**Last Updated**: January 2026  
**Current Version**: 1.0.0



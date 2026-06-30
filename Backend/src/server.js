import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import setupSocket from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

//Create HTTP server
const server = http.createServer(app);

//Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//attach socket logic
setupSocket(io);

//start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
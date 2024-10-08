import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import matchRouter from './routes/match.route.js';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";

import { connectDB } from './db.js';
import { scoreUpdate } from './controllers/match.controller.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*", // Update CORS policy if necessary
        methods: ["GET", "POST"]
    }
});


app.use(express.json());
app.use(cookieParser());

app.use(cors());


app.use('/api/match', matchRouter);

httpServer.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on('update-score', (msg) => {
        scoreUpdate(msg);
        console.log(msg);
        io.emit('scoreUpdated', msg);

    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
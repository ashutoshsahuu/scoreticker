import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import matchRouter from './routes/match.route.js';
import cors from 'cors';


import { connectDB } from './db.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());


dotenv.config();

connectDB();


const port = process.env.PORT || 3000;

app.use('/api/match', matchRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

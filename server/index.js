import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Debug from 'debug';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello! This is teamwork app');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const debug = Debug('http');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    debug(`server running at port ${PORT}`);
});


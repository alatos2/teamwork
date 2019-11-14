import express from 'express';
import authentication from '../middlewares/auth';
import gifs from '../controller/gifs';

const gifRoute = express.Router();

gifRoute.post('/gifs', authentication, gifs.createGif);
gifRoute.delete('/gifs/:id', authentication, gifs.deleteGif);

export default gifRoute;

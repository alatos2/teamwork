import express from 'express';
import { isAdmin } from '../middlewares/permission';
import authentication from '../middlewares/auth';
import createUser from '../controller/users';

const userRoute = express.Router();

userRoute.post('/create-user', authentication, isAdmin, createUser);

export default userRoute;

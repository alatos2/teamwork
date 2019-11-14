import express from 'express';
import { isAdmin } from '../middlewares/permission';
import authentication from '../middlewares/auth';
import { createAccount, signin } from '../controller/users';

const userRoute = express.Router();

userRoute.post('/create-user', authentication, isAdmin, createAccount);
userRoute.post('/signin', signin);

export default userRoute;

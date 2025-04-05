import express from 'express';
import { deleteUser, getAllUsers, getExpiredUsers, getUserById, getUsersEndingSoon, getUsersWithDueAmount, searchUsersByName, updateUser } from '../controllers/user.js';
import { createUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/getAllUsers', getAllUsers);
userRouter.get('/ending-soon', getUsersEndingSoon);
userRouter.get('/expired', getExpiredUsers);
userRouter.post('/createUser',createUser)
userRouter.post('/updateUser/:id',updateUser)
userRouter.get('/getUserDetails/:id', getUserById);
userRouter.get('/searchUsersByName/', searchUsersByName);
userRouter.get('/searchUsersByName/', searchUsersByName);
userRouter.post('/deleteUser/:id',deleteUser)
userRouter.get('/getDuesUser',getUsersWithDueAmount)

export default userRouter;

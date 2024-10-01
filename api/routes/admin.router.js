import express from 'express';
import { addUser, deleteUser, updateUser, usersData } from '../controllers/admin.controller.js';

const admin_router = express.Router();

admin_router.get('/users-data', usersData); 
admin_router.post('/add-user',addUser);
admin_router.delete('/delete-user/:id', deleteUser);
admin_router.put('/update-user/:id', updateUser);
// admin_router.post('/sign-out', signout);

export default admin_router;
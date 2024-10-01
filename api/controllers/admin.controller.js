import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const usersData = async (req, res, next) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (err) {
        next(errorHandler(500, "Something went wrong"));
    }
};

export const addUser = async(req,res) => {
    const { username, email, password } = req.body; 
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password:hashedPassword }); 
        await newUser.save();
        res.status(201).json(newUser); 
      } catch (error) {
        next(errorHandler(500, "Something went wrong"));
      }
    };
 

    export const deleteUser = async (req, res, next) => {
        const { id } = req.params; 
        try {
            console.log('Deleting user with ID:', id);
          const deletedUser = await User.findByIdAndDelete(id); 
      
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); 
          }
      
          res.status(200).json({ message: 'User removed successfully' }); 
        } catch (error) {
          next(error); 
        }
      };   
      
      export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};


// export const signout = (req,res)=>{
//   res.clearCookie('access_token').status(200).json('Signout success');
// }
      

    

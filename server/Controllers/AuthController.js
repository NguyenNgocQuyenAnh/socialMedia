import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

// dang ky user

export const registerUser = async (req,res) =>{  
   const {username, password,firstname,lastname,confirmpassword} = req.body   
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)
    const newUser = new UserModel({username,password:hashedPass,firstname,lastname,confirmpassword})
   try {
       const oldUser = await UserModel.findOne({username})
       if(oldUser){
          return res.status(400).json({message:"username is already registered!"})
       }

      const user = await newUser.save()
      const token = jwt.sign({
         username: user.username,id: user._id
      },process.env.JWT_KEY,{expiresIn:'1h'})
      res.status(200).json({user,token})
   } catch (error) {
      res.status(500).json({message:error.message})
   }
}
// dang nhap user
export const loginUser = async (req,res)=>{
   try {
      const {username,password} = req.body
      const user = await UserModel.findOne({username:username})
      if(user){
         const validity = await bcrypt.compare(password,user.password)
         if(!validity){
            res.status(400).json("wrong password")
         }
         else{
            const token = jwt.sign({
               username: user.username,id: user._id
            },process.env.JWT_KEY,{expiresIn:'1h'})
            res.status(200).json({user,token})
         }
      }
      else{
         res.status(404).json("user does not exist")
      }
   } catch (error) {
      res.status(500).json({message:error.message})
   }
}


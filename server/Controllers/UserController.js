import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
// get user
export const getUser = async (req,res) =>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("no such user exits")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// update user
export const updateUser = async (req, res) => {
    const id = req.params.id
    const {_id, userAdminStatus,password} = req.body
    console.log("id:",id);
    console.log("_id:",_id);
    if(id === _id){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            const token = jwt.sign(
                {username:user.username, id: user.id},
                process.env.JWT_KEY,{expiresIn:'1h'}
            )
            res.status(200).json({user,token})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    else {
        res.status(403).json("Access Denied! you can only update your own profile") 
    }
}

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const {currentUserId , currentUserAdminStatus} = req.body
  if(currentUserId === id || currentUserAdminStatus){
    try {
        await UserModel.findByIdAndDelete(id)
        res.status(200).json("user deleted successfully")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  }
  else {
    res.status(403).json("Access Denied! you can only delete your own profile") 
  }
}

// follow a user
export const followUser = async(req, res) => {
    const id  = req.params.id
    const {_id} = req.body
    if(_id === id){
        res.status(403).json("action forhidden")
    }
    else {
        try {
            // followers : nguoi theo doi , following : dang theo doi
            const  followUser = await UserModel.findById(id)
            const followingUser =await UserModel.findById(_id)
           if(!followUser.followers.includes(_id)){
             await followUser.updateOne({$push:{followers:_id}})
             await followingUser.updateOne({$push:{following:id}})
             res.status(200).json("User followed!")
           }
           else{
             res.status(403).json("user is already followed by you")
           }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}
//  unfollow a user 
export const unFollowUser = async(req, res) => {
    const id  = req.params.id
    const {_id} = req.body
    if(_id === id){
        res.status(403).json("action forhidden")
    }
    else {
        try {
            // followers : nguoi theo doi , following : dang theo doi
            const  followUser = await UserModel.findById(id)
            const followingUser =await UserModel.findById(_id)
           if(followUser.followers.includes(_id)){
             await followUser.updateOne({$pull:{followers:_id}})
             await followingUser.updateOne({$pull:{following:id}})
             res.status(200).json("User unfollowed!")
           }
           else{
             res.status(403).json("user is not followed by you")
           }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user)=>{
            const {password,...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
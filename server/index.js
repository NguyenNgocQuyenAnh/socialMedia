import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
const app = express();
// public image
app.use(express.static('public'))
app.use('/images', express.static("images"))
//middleware
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
dotenv.config()
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`)))
    .catch(error => console.error("Error connecting to MongoDB:", error));
 
 // use route

 app.use('/auth',AuthRoute)
 app.use('/user',UserRoute)
 app.use('/posts',PostRoute)
 app.use('/upload',UploadRoute)
 app.use('/chat',ChatRoute)
 app.use('/message',MessageRoute)
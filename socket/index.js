const io = require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})
let activeUsers = []

io.on("connection", (socket)=>{
    // add new user
    socket.on('new-user-add',(newUserId)=>{
        if(!activeUsers.some((user)=>user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("connected",activeUsers);
        io.emit('get-users', activeUsers)
    })
   //send message 
    socket.on("send-message", (data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=> user.userId === receiverId)
        console.log("sending from socket",receiverId);
        console.log("data",data);
        if(user){
            io.to(user.socketId).emit("receive-message",data)
        }
    })

    socket.on("disconnect", ()=>{
        activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
        console.log("user disconnected",activeUsers);
        io.emit('get-users', activeUsers)
    })
})
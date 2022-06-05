const { Socket } = require("socket.io");

const io = require("socket.io")(4001, {
  cors: {
    origin: "http://localhost:8080",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => {
    return user.socketId !== socketId;
  });
};
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
// when connect
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message

  socket.on("sendMessage", (senderId, receiverId, text) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      text,
      senderId,
    });
  });
  //send Notification 
  socket.on("sendNotification",(senderId, receiverId ,payload)=>{  
      console.log(payload);
      const receiver = getUser(receiverId) ;  
      io.to(receiver?.socketId).emit("getNotification", "test");

  } );

  // when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

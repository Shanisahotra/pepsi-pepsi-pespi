import prisma from "../utils/prismaClient.js";

const onlineUsers = {}; 
// userId -> socketId

const setupSocket = (io) => {

  io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    // USER JOIN
    socket.on("join", ({ userId }) => {
      onlineUsers[userId] = socket.id;
    });

    //SEND MESSAGE
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, message } = data;

      // 1. SAVE IN DB (based on your schema)
      const savedMessage = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          message,
        },
      });

      // 2. SEND TO RECEIVER (REAL TIME)
      const receiverSocket = onlineUsers[receiverId];

      if (receiverSocket) {
        io.to(receiverSocket).emit(
          "receiveMessage",
          savedMessage
        );
      }

      // 3. OPTIONAL: SEND BACK TO SENDER
      socket.emit("receiveMessage", savedMessage);
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });

  });

};

export default setupSocket;
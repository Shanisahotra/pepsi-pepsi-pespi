import prisma from "../utils/prismaClient.js";

// SEND MESSAGE (DB ONLY)
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET CHAT BETWEEN TWO USERS
export const getChat = async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: Number(user1),
            receiverId: Number(user2),
          },
          {
            senderId: Number(user2),
            receiverId: Number(user1),
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    res.json({
      success: true,
      data: messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE MESSAGE
export const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;

    const updatedMessage = await prisma.message.update({
      where: {
        id: Number(messageId),
      },
      data: {
        message,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await prisma.message.delete({
      where: {
        id: Number(messageId),
      },
    });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deletedMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
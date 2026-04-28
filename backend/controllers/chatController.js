const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      participants: userId,
    })
      .sort({ updatedAt: -1 })
      .populate('participants', 'name profilePic email');

    res.json(conversations);
  } catch (error) {
    console.error('CHAT GET CONVERSATIONS ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipientId } = req.body;

    if (!recipientId) {
      return res.status(400).json({ message: 'recipientId is required' });
    }

    if (recipientId === userId) {
      return res.status(400).json({ message: 'Cannot create conversation with yourself' });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, recipientId] },
      $expr: { $eq: [{ $size: '$participants' }, 2] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, recipientId],
      });
      await conversation.save();
    }

    await conversation.populate('participants', 'name profilePic email');

    res.status(201).json(conversation);
  } catch (error) {
    console.error('CHAT CREATE CONVERSATION ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const isParticipant = conversation.participants.some((participant) =>
      participant.equals(userId)
    );
    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 })
      .populate('sender', 'name profilePic');

    res.json(messages);
  } catch (error) {
    console.error('CHAT GET MESSAGES ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const isParticipant = conversation.participants.some((participant) =>
      participant.equals(userId)
    );
    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const message = new Message({
      conversation: conversationId,
      sender: userId,
      text: text.trim(),
    });
    await message.save();

    conversation.lastMessage = message.text;
    await conversation.save();

    await message.populate('sender', 'name profilePic');

    res.status(201).json(message);
  } catch (error) {
    console.error('CHAT SEND MESSAGE ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
};

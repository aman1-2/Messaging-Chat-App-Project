import Message from '../schema/message.js'
import crudRepository from './crudRepository.js';

const messageRepository = {
    ...crudRepository(Message),

    getPaginatedMessages: async (messageParams, page, limit) => {
        try {
            const message = await Message.find(messageParams)
                        .sort({ createdAt: -1})
                        .skip((page - 1)*limit)
                        .limit(limit)
                        .populate('senderId', 'username email avatar')
                        .populate('channelId')
                        .populate('workspaceId');

            return message;
        } catch(error) {
            console.log("Message Repository Layer Error where we trying to fetch the message (in paginated fashion): ", error);
            throw error;
        }
    }
};

export default messageRepository;
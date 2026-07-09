import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';
import { isUserMemberOfWorkspace } from '../utils/common/userUtils.js';
import  ClientError from '../utils/errors/clientError.js';

export const getChannelByIdService = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

        if(!channel) {
            throw new ClientError({
                explanation: 'Invalid data sent by Client, no such channel-id exists',
                message: 'Channel Not Found',
                statusCode: 404
            });
        }

        const isUserPartOfWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);

        if(!isUserPartOfWorkspace) {
            throw new ClientError({
                explanation: 'User is not a member of the Workspace and hence cannot access the channel.',
                message: 'User is not a member of the Workspace',
                statusCode: 401
            });
        }

        const messages = await messageRepository.getPaginatedMessages(
            { channelId }, 1, 20
        );

        // So not able to add a property like this in mongoose object.
        // channel.messages = messages; // When we tried to destructure it started giving some cashe details and some irrelevant data which was not needed.

        // Created a custom response altogether
        // return {
        //     messages,
        //     _id: channel._id,
        //     name: channel.name,
        //     createdAt: channel.createdAt,
        //     updatedAt: channel.updatedAt,
        //     workspaceId: channel.workspaceId
        // };

        return {
            ...channel.toObject(),
            messages
        };
    } catch(error) {
        console.log("Getting Channel by Id Service Layer Error: ", error);
        throw error;
    }
};
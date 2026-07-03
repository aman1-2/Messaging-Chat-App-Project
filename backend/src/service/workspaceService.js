import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from "../repositories/workspaceRepository.js";
import ValidationError from "../utils/errors/validationError.js";
import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';

export const createWorkspaceService = async (workspaceData) => {
    try {
        const joinCode = uuidv4().toUpperCase(); // This will return 36 character string
        
        const response = await workspaceRepository.create({ 
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode  
        });

        await workspaceRepository.addMemberToWorkspace(response._id, workspaceData.owner, 'admin');

        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(response._id, 'Daemon');

        return updatedWorkspace;
    } catch(error) {
        console.log("Workspace Creation Service Layer Error: ", error);
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }

        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A Workspace with same details already exists']
                },
                'A Workspace with same details already exists'
            );
        }

        throw error;
    }
};

export const getWorkspaceUserIsMemberOfService = async (userId) => {
    try {
        const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
        return response;
    } catch(error) {
        console.log("Workspace Service Layer User Is Member of Workspace Error: ", error);
        throw error;
    }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if(!workspace) {
            throw new ClientError({
                explanation: "Invalid Data send from the client",
                message: "Workspace not found",
                statusCode: 404
            });
        }

        const isAllowed = workspace.members.find(
            (member) => member.memberId.toString() === userId && member.role === 'admin'
        );

        // const channelIds = workspace.channels.map((channel) => channel._id);

        if(isAllowed) {
            await channelRepository.deleteMany(
                workspace.channels
            );

            const response = await workspaceRepository.delete(workspaceId);
            return response;
        }

        throw new ClientError({
            explanation: "User is either not a member or an admin of the workspace",
            message: "User not allowed to delete the Workspace",
            statusCode: 401
        });

    } catch(error) {
        console.log("Workspace deletion Service Layer Error: ", error);
        throw error;
    }
}
import Workspace from "../schema/workspace.js";
import User from "../schema/user.js";
import crudRepository from "./crudRepository.js";
import ClientError from "../utils/errors/clientError.js";

const workspaceRepository = {
    ...crudRepository(Workspace),

    getWorkspaceByName: async function (workspaceName) {
        try {
            const workspace = await Workspace.findOne({ name: workspaceName });

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            return workspace;
        } catch(error) {
            console.log("Workspace Repository get by name Error: ", error);
        }
    },

    getWorkspaceByJoinCode: async function(joinCode) {
        try {
            const workspace = await Workspace.findOne({ joinCode });

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            return workspace;
        } catch(error) {
            console.log("Workspace Repository get by join code Error: ", error);
        }
    },

    addMemberToWorkspace: async function({ workspaceId, memberId, role }) {
        try {
            const workspace = await Workspace.findById(workspaceId);

            if(!workspace) {
                throw new ClientError({
                    explanation: "Invalid data send from client",
                    message: "Workspace not found",
                    statusCode: "404"
                });
            }

            const isValidUser = await User.findById(memberId);

            if(!isValidUser) {
                throw new ClientError({
                    explanation: "Invalid data send feom client",
                    message: "User not found to add",
                    statusCode: "404"
                });
            }

            // Member already the part of the workspace
            const isMemberPartOfWorkspace = Workspace.members.find((member) => member.memberId == memberId);
            
            if(isMemberPartOfWorkspace) {
                throw new ClientError({
                    explanation: "Invalid data sent from the client",
                    message: "User already part of workspace",
                    statusCode: 403
                });
            }

            workspace.members.push({
                memberId,
                role
            });

            await workspace.save();

            return workspace
        } catch(error) {
            console.log("Workspace Repository add member Error: ", error);
        }
    },

    addChannelToWorkspace: async function() {

    },

    fetchAllWorkspaceByMemberId: async function() {

    }
};

export default workspaceRepository;
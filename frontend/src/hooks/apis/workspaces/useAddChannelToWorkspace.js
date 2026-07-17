import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addChannelRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useAddChannelToWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { isPending, isSuccess, error, mutateAsync: addChannelToWorkspaceMutation} = useMutation({
        mutationFn: ({channelName}) => addChannelRequest({ workspaceId, channelName, token: auth?.token } ),

        onSuccess: async (response) => {
            console.log('Successfully Created a New Channel for the Workspace: ', response);
            toast.success('Successfully Created a New Channel for the Workspace');

            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces']
            });
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaceById', workspaceId]
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addChannelToWorkspaceMutation
    };
};

export default useAddChannelToWorkspace;
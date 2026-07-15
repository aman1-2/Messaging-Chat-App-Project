import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';

const useDeleteWorkspace = () => {
    const { auth } = useAuth();

    const { workspace } = useWorkspacePreferencesModal();

    const { isSuccess, isPending, error, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId: workspace._id, token: auth?.token}),
        onSuccess: (response) => {
            console.log('Successfully Deleted the Workspace: ', response);
            toast.success('Successfully Deleted the Workspace');
        },
        onError: (error) => {
            console.log('Error while deleting the workspace: ', error);
            toast.error('Error while deleting the workspace');
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        deleteWorkspaceMutation
    };
};

export default useDeleteWorkspace;
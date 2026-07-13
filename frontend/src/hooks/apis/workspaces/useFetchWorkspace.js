import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

export const useFetchWorkspace = () => {
    const { auth } = useAuth();

    const { isPending, isError, isSuccess, data: workspaces} = useQuery({
        queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
        queryKey: ['fetchWorkspaces'],
        staleTime: 30000
    });

    return {
        isPending,
        isError,
        isSuccess,
        workspaces
    };
};
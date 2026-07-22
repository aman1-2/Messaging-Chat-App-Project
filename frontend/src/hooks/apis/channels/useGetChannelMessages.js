import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channels';
import useAuth from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId) => {
    const { auth } = useAuth();

    const {isSuccess, isError, error, isFetching, data: channelMessages} = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, limit: 10, offset: 1, token: auth?.token }),
        queryKey: ['getPaginatedMessages', channelId],
        staleTime: 10000
    });

    return {
        isSuccess,
        isError,
        error,
        isFetching,
        channelMessages
    };
};
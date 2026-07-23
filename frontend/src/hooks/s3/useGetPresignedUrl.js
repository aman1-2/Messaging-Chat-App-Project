import { useQuery } from '@tanstack/react-query';

import { getPresignedUrlRequest } from '@/apis/s3';

import useAuth from '../context/useAuth';

const useGetPresignedUrl = () => {
    const { auth } = useAuth();

    const { isFetching, isError, error, isSuccess, data: presignedUrlData } = useQuery({
        queryFn: () => getPresignedUrlRequest({ token: auth?.token }),
        queryKey: ['getPresignedUrl'],
        staleTime: 30000
    });

    return {
        isFetching,
        isError,
        error,
        isSuccess,
        presignedUrlData
    };
};

export default useGetPresignedUrl;
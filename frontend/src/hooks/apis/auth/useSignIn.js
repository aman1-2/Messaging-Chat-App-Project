import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';

const useSignIn = () => {
    const {isPending, isError, isSuccess, mutateAsync: signInMutation} = useMutation({
        mutationFn: signInRequest,

        onSuccess: (data) => {
            console.log('Successfully signed in User: ', data);
            toast.success('Successfully signed in');
        },

        onError: (error) => {
            console.log('Failed to log in User: ', error);
            toast.error('Failed to login User', {
                description: error.message
            });
        }
    });

    return {
        isError, isPending, isSuccess, signInMutation
    };
};

export default useSignIn;
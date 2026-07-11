import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';

const useSignIn = () => {
    const {isPending, isError, isSuccess, mutateAsync: signInMutation} = useMutation({
        mutationFn: signInRequest,

        onSuccess: (response) => {
            console.log('Successfully signed in User: ', response);

            const userObject = JSON.stringify(response.data);

            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);

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
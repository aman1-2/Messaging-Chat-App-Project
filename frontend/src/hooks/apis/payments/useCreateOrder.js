import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createOrderRequest } from '@/apis/payments';
import useAuth from '@/hooks/context/useAuth';

const useCreateOrder = () => {
    const { auth } = useAuth();

    const {isSuccess, isPending, error, mutateAsync: createOrderMutation } = useMutation({
        mutationFn: (amount) => createOrderRequest({ amount, token: auth?.token }),

        onSuccess: (response) => {
            console.log('Successfully Created the Order', response);
            toast.success('Successfully Created Order');
        },

        onError: (error) => {
            console.log('Failed to create the order', error);
            toast.error('Failed to create the order');
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        createOrderMutation
    };
};

export default useCreateOrder;
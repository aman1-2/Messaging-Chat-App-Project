import { useMutation } from '@tanstack/react-query';

import { capturePayment } from '@/apis/payments';
import useAuth from '@/hooks/context/useAuth';

const useCaptureOrder = () => {
    const { auth } = useAuth();

    const {isSuccess, isPending, error, mutateAsync: captureOrderMutation} = useMutation({
        mutationFn: ({ orderId, status, paymentId, signature }) => capturePayment(
            { orderId, paymentId, status, signature, token: auth.token }
        ),

        onSuccess: (response) => {
            console.log('Payment Captured Successfully:', response);
        },

        onError: (error) => {
            console.log('Failed to Capture the Payment:', error);
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        captureOrderMutation
    };
};

export default useCaptureOrder;
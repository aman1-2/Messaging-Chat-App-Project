import axios from '@/config/axios.config';

export const createOrderRequest = async ({ token, amount }) => {
    try {
        const response = await axios.post('/payments/order', { amount }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Error Request While creating the Order for the payment: ', error);
        throw error.response?.data;
    }
};

export const capturePayment = async (token, orderId, status, paymentId, signature) => {
    try {
        const response = await axios.post('/payments/capture', 
            {orderId, status, paymentId, signature},
            {
                headers: {
                    'x-access-token': token
                }
            }
        );

        return response?.data?.data;
    } catch(error) {
        console.log('API Error Request While capturing the payment: ', error);
        throw error.response?.data;
    }
};
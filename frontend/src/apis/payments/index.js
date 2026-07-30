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
import paymentRepository from "../repositories/paymentRepository.js";
import { RAZORPAY_KEY_SECRET } from "../config/serverConfig.js"

export const createPaymentService = async (orderId, amount) => {
    try{
        const payment = await paymentRepository.create({orderId, amount});
        return payment;
    } catch(error) {
        console.log("Payment Service Layer Error while Creating Payment entry: ", error);
        throw error;
    }
};

export const updatePaymentStatusService = async (orderId, status, paymentId, signature) => {
    try {
        // Verify if payment is success or not ?
        if(status == 'Success') {
            const shaResponse = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
            console.log('shaResponse:',shaResponse, signature);

            if(shaResponse === signature) {
                const payment = await paymentRepository.updateOrder(orderId, { status: 'Success', paymentId });
                return payment;
            } else {
                throw new Error('Payment Verification failed');
            }
        }
    } catch(error) {
        console.log("Payment Service Layer Error while updating the status of the captured payment: ", error);
        throw error;
    }
}
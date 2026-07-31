import Payment from '../schema/payment.js';
import crudRepository from './crudRepository.js';

const paymentRepository = {
    ...crudRepository(Payment), 

    updateOrder: async function (orderId, data) {
        try {
            const updatedOrder = await Payment.findOneAndUpdate({ orderId }, { data }, { new: true });
            return updatedOrder;
        } catch(error) {
            console.log("Payment Repository Layer Error while updating the payment status: ", error);
            throw error;
        }
    }
};

export default paymentRepository;
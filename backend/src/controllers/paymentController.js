import { CURRENCY, RECEIPT_SECRET } from "../config/serverConfig.js";
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObject.js';
import razorpay from "../config/razorpayConfig.js"
import { createPaymentService, updatePaymentStatusService } from "../service/paymentService.js";

export const createOrderController = async (req, res) => {
    try{
        const options = {
            amount: req.body.amount * 100,
            currency: CURRENCY,
            receipt: RECEIPT_SECRET
        } 

        const order = await razorpay.orders.create(options);

        console.log('Order Details:',order);

        await createPaymentService(order.id, order.amount);

        if(!order) {
            throw new Error('Failed to create order');
        }

        return res.status(201).json(
            successResponse(order, "Order Created Successfully")
        );
    } catch(error) {
        console.log('Error in Controller layer while creating the order: ', error);
        
        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
};

export const capturePaymentController = async (req, res) => {
    try {
        console.log('Request body: ', req.body);

        await updatePaymentStatusService(req.body.orderId, req.body.status, req.body.paymentId, req.body.signature);

        return res.status(200).json(
            successResponse("", 'Payment Captures Successfully')
        );
    } catch(error) {
        console.log('Error in Controller layer while capturing the payment: ', error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
};
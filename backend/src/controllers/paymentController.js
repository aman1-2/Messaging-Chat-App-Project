import { CURRENCY, RECEIPT_SECRET } from "../config/serverConfig.js";
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObject.js';
import razorpay from "../config/razorpayConfig.js"

export const createOrderController = async (req, res) => {
    try{
        const options = {
            amount: req.body.amount * 100,
            currency: CURRENCY,
            receipt: RECEIPT_SECRET
        } 

        const order = await razorpay.orders.create(options);

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
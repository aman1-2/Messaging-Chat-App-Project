import { useEffect } from 'react';

import useCaptureOrder from '@/hooks/apis/payments/useCaptureOrder';

const loadRazorpayScript = (src) => {
    return new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Razorpay Script Loaded');
            res(true);
        };
        script.onerror = () => {
            console.log('Error in loading Razorpay Script');
            rej(false);
        };
        document.body.appendChild(script);
    });
};

const RenderRazorPopup = ({
    orderId,
    keyId,
    currency,
    amount
}) => {
    const { captureOrderMutation } = useCaptureOrder();

    const display = async (options) => {
        const scriptResponse = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!scriptResponse) {
            console.log('Error in loading script');
            return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', async function (response) {
            console.log('Payment Failed', response.error);
            await captureOrderMutation({
                orderId: options.order_Id,
                status: 'Failed',
                paymentId: ''
            });
        });

        rzp.open();
    };

    useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: 'Aman', // Whom you are going to make the payment name of the company (Bussiness name)
            description: 'Test Trancation',
            order_id: orderId,
            // callback_url: 'http://127.0.0.1:3000/api/v1/payments/capture',
            handler: async (response) => {
                console.log('Payment Successful', response);
                await captureOrderMutation({
                orderId: orderId,
                status: 'Success',
                paymentId: response.razorpay_payment_id,
                signature: response.razorpat_signature
            });
            }
        });
    }, [orderId]);

    return null;
};

export default RenderRazorPopup;
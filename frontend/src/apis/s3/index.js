import axios from 'axios';

import axiosConfig from '@/config/axios.config';

export const uploadeImageToAWSPresignedUrl = async ({ url, file }) => {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type
            }
        });

        console.log('Response of image upload to s3: ', response);
        return response;

    } catch(error) {
        console.log('API Request Error trying to upload the image to AWS with presigned url Eroor: ', error);
        return error.response?.data;
    }
};

export const getPresignedUrlRequest = async ({ token }) => {
    try {
        const response = await axiosConfig.get('/messages/pre-signed-url', {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while trying to fetch the pre-signed url from AWS Error: ', error);
        return error.response?.data;
    }
};
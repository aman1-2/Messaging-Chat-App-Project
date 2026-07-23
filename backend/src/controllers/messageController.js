import { S3 } from '../config/awsConfig.js';
import { AWS_BUCKET_NAME } from '../config/serverConfig.js';
import { getMessagesService } from '../service/messageService.js';
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObject.js';

export const getMessagesController = async (req, res) => {
    try {
        const response = await getMessagesService(
            { channelId: req.params.channelId },
            req.query.page || 1, req.query.limit || 20, req.user
        );

        return res.status(200).json(
            successResponse(
                response, 'Successfully Fetched the messages.'
            )
        );
    } catch(error) {
        console.log("Fetching Messages, Message Controller Layer Error: ", error);
        
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

export const getPresignedUrlFromAWS = async (req, res) => {
    try {
        const url = await S3.getSignedUrlPromise('putObject', {
            Bucket: AWS_BUCKET_NAME,
            Key: `${Date.now()}`,
            Expires: 60 // 1 Minute
        });
        
        return res.status(200).json(
            successResponse(url, 'PreSigned url generated successfully form AWS')
        );
    } catch(error) {
        console.log("Presigned URL asked from AWS, Controller Layer Error: ", error);

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
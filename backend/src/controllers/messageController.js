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
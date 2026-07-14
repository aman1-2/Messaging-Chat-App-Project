import jwt from 'jsonwebtoken';

import { customErrorResponse, internalErrorResponse } from '../utils/common/responseObject.js';
import { JWT_SECRET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository.js';

export const isAuthenticates = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if(!token) {
            return res.status(403).json(
                customErrorResponse({
                    explanation: "Invalid data sent from the client",
                    message: "No Auth Token Provided"
                })
            );
        }

        const response = jwt.verify(token, JWT_SECRET);

        if(!response) {
            return res.status(403).json(
                customErrorResponse({
                    explanation: "Invalid data sent from the client",
                    message: "Invalid Auth Token Provided"
                })
            );
        }

        // If we have token and token is valid then fetch the user
        const user = await userRepository.getById(response.id);
        req.user = user.id;
        
        next();
        
    } catch(error) {
        console.log("Auth-Middleware isAuthenticates Error:", error);

        if(error.name === 'JsonWebTokenError') {
            return res.status(403).json(
                customErrorResponse({
                    explanation: "Invalid data sent from the client",
                    message: "Invalid Auth Token Provided"
                })
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        )
    }
}
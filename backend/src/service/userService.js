import bcrypt from 'bcrypt';

import userRepository from "../repositories/userRepository.js"
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import { createJWT } from '../utils/common/authUtils.js';

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.create(data);
        return newUser;
    } catch (error) {
        console.log('User service error', error);
        
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }

        if (error.name === 'MongooseError' && error.cause?.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with same email or username already exists']
                },
                'A user with same email or username already exists'
            );
        }
    }
}

export const signInService = async (data) => {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if(!user) {
            throw new ClientError({
                explanation: "Invalid Data send from the client",
                message: "No registered user found with this email",
                statusCode: 404
            });
        }

        // match the incoming password with the hashed password
        const isMatch = bcrypt.compareSync(data.password, user.password);

        if(!isMatch) { // password not matched
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "Invalid password, please try again",
                statusCode: 400
            });
        }
        
        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
            token: createJWT({id: user._id, email: user.email})
        };
    } catch(error) {
        console.log("User Service Layer SignIn Error: ", error);
        throw error;
    }
}
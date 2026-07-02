import { signInService, signUpService } from "../service/userService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const signUp = async (req, res) => {
    try{
        const user = await signUpService(req.body);
        return res.status(201).json(successResponse(user, "A new User registered"));
    } catch(error) {
        console.log("User Controller SignUp Error:", error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(500).json(internalErrorResponse(error));
    }
}

export const signIn = async (req, res) => {
    try {
        const response = await signInService(req.body);
        return res.status(201).json(
            successResponse(response, "User signed in successfully")
        );
    } catch(error) {
        console.log("User Controller SignIn Error:", error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(500).json(internalErrorResponse(error));
    }
}
import {  Request, Response,NextFunction } from "express";

import jwt,{JwtPayload} from "jsonwebtoken";
import { getFormattedHttpResponse, HttpResponse } from "../utils/format-http-response";
import { JWT_USER_PASSWORD } from "../config";

export interface JwtWithId extends JwtPayload {
    id: string;
}

export interface AuthenticatedRequest extends Request{
    user?: JwtWithId;
}

export const isAuthenticated = (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            const {statusCode,message} = getFormattedHttpResponse(HttpResponse.TOKEN_REQUIRED);
            res.status(statusCode).json({message});
            return;
        }
        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token,JWT_USER_PASSWORD);

        // Type guard to check if decodedData has the 'id' field
        if (typeof decodedData === 'object' && 'id' in decodedData) {
            req.user = decodedData as JwtWithId;
            next();
        } else {
            const { statusCode, message } = getFormattedHttpResponse(HttpResponse.INVALID_OR_EXPIRED_TOKEN);
            res.status(statusCode).json({message});
        }

    }catch(error){
        const {statusCode,message} = getFormattedHttpResponse(HttpResponse.INVALID_OR_EXPIRED_TOKEN);
        res.status(statusCode).json({
            message,
            error:error.errors
        });
    }
}

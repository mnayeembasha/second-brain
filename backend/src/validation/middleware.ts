import {ZodSchema,ZodError} from 'zod';
import { Request,Response,NextFunction } from 'express';

export const validateSchema = (schema:ZodSchema) => {
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            schema.parse(req.body);
            next();
        }catch(error){
            res.status(400).json({ error: (error as ZodError).errors });
        }
    }

}
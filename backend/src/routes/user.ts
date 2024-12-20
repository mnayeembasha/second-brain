import { Router, Request, Response } from "express";
const userRouter = Router();
import { validateSchema } from "../validation/middleware";
import { validateSignUpSchema , validateSignInSchema, SignUpRequestBody, SignInRequestBody } from "../validation/schema";
import { userModel } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_USER_PASSWORD } from "../config";
import { getFormattedHttpResponse, HttpResponse } from "../utils/format-http-response";


userRouter.post(
  "/signup",
  validateSchema(validateSignUpSchema),
  async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNUP_SUCCESS);
      res.status(statusCode).json({
        message,
        user: { name, email },
      });
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error code
        const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNUP_EMAIL_CONFLICT);
        res.status(statusCode).json({
          message,
          error:error.errors
        });
        return;
      }
      const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNUP_FAILED);
      res.status(statusCode).json({
        message,
        error: error.errors,
      });
    }
  }
);
userRouter.post(
  "/signin",
  validateSchema(validateSignInSchema),
  async (req: Request<{}, {}, SignInRequestBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNIN_EMAIL_NOT_FOUND);
        res.status(statusCode).json({
          message
        });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNIN_INVALID_PASSWORD);
        res.status(statusCode).json({
          message
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_USER_PASSWORD,
        {
          expiresIn: "1h",
        }
      );

      const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNIN_SUCCESS);
      res.status(statusCode).json({
        message,
        token
      });
    }
    catch (error) {
      const {statusCode,message} = getFormattedHttpResponse(HttpResponse.SIGNIN_FAILED);
      res.status(statusCode).json({
        message,
        error: error.errors,
      });
    }
  }
);

export default userRouter;

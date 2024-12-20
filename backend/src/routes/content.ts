import { Router, Request, Response } from "express";
import { AuthenticatedRequest, isAuthenticated } from "../middleware/auth";
import { validateSchema } from "../validation/middleware";
import { ContentRequestBody, validateContentSchema } from "../validation/schema";
import { contentModel } from "../db";
import { getFormattedHttpResponse, HttpResponse } from "../utils/format-http-response";
const contentRouter = Router();


type AuthenticatedContentRequest = AuthenticatedRequest & Request<{}, {}, ContentRequestBody>;

contentRouter.post("/",isAuthenticated,validateSchema(validateContentSchema),async(req:AuthenticatedContentRequest,res:Response)=>{
    try{
        const {title,link,type} = req.body;
        const userId = req.user?.id;
        const addedContent = await contentModel.create({
            title,
            link,
            type,
            userId
        });

        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_ADDED_SUCCESSFULLY);
        res.status(statusCode).json({
            message,
            content: addedContent,
        });

    }catch(error){
        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_CREATION_FAILED);
        res.status(statusCode).json({
            message,
            error: error.message,
        });
    }
});

contentRouter.get("/",isAuthenticated,async(req:AuthenticatedRequest,res:Response)=>{
    try{
        const userId = req.user?.id;
        const content = await contentModel.find({userId});
        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_ADDED_SUCCESSFULLY);
        res.status(statusCode).json({
            message,
            content,
        });

    }catch(error){
        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_CREATION_FAILED);
        res.status(statusCode).json({
            message,
            error: error.message,
        });
    }
});

contentRouter.put("/:contentId",isAuthenticated,validateSchema(validateContentSchema),async(req:AuthenticatedContentRequest,res:Response)=>{
    try{
        const {title,link,type} = req.body;
        const contentId=req.params.contentId;
        const addedContent = await contentModel.updateOne({_id:contentId},{
            title,
            link,
            type,
        });

        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_ADDED_SUCCESSFULLY);
        res.status(statusCode).json({
            message,
            content: addedContent,
        });

    }catch(error){
        const { statusCode, message } = getFormattedHttpResponse(HttpResponse.CONTENT_CREATION_FAILED);
        res.status(statusCode).json({
            message,
            error: error.message,
        });
    }
});

contentRouter.delete("/:contentId",isAuthenticated,async(req:AuthenticatedRequest,res:Response)=>{
   try{
        const userId = req.user?.id;
        const contentId = req.params.contentId;
        const result = await contentModel.deleteOne({ _id: contentId, userId });

        if (result.deletedCount === 0) {
        res.status(404).json({ message: "Content not found or you do not have permission to delete it" });
        return;
        }

        res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
        res.status(500).json({ message: "Failed to delete content", error: error.message });
  }

});


export default contentRouter;
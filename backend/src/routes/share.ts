import { Router, Request, Response } from "express";
import { isAuthenticated, JwtWithId } from "../middleware/auth";
import { validateSchema } from "../validation/middleware";
import { ShareBrainRequestBody, validateShareBrainRequest } from "../validation/schema";
import { contentModel, linkModel } from "../db";
import crypto from "crypto";
const shareRouter = Router();

 interface AuthenticatedShareRequest extends Request {
    user?: JwtWithId;
    body: ShareBrainRequestBody;
}
// type AuthenticatedShareRequestBody =  AuthenticatedRequest & ShareBrainRequestBody;
shareRouter.post("/share",isAuthenticated,validateSchema(validateShareBrainRequest),async(req:AuthenticatedShareRequest,res:Response)=>{
    try{
        const userId = req.user?.id;
        if (!userId) {
           res.status(401).json({ message: "Unauthorized" });
           return;
        }
        const {share} = req.body;
        if(share){
            const existingLink = await linkModel.findOne({ userId });
            if(existingLink){
                res.status(200).json({
                    // message: "Link already exists for this user",
                    link:existingLink.hash
                });
                return;
            }
            const hash = crypto.randomBytes(10).toString("hex");
            const createdLink = await linkModel.create({hash,userId});

            res.status(200).json({
                message: "Content is now shared with the world",
                shareLink:createdLink.hash,
            });

        }else{
            const deleteResult = await linkModel.deleteOne({ userId });
            if (deleteResult.deletedCount === 0) {
                res.status(404).json({message: "No shared link found for this user"});
                return
            }
            res.status(200).json({message: "Content is no longer shared"});
        }
    }catch(error){
        res.status(500).json({
            message: "Failed to update share status",
            error: error.message,
        });
    }
});

shareRouter.get("/:shareLink",async(req:Request,res:Response)=>{
    const shareLink = req.params.shareLink;

    try{
        const link = await linkModel.findOne({ hash: shareLink });
        if (!link) {
            res.status(404).json({ message: "Share link not found | Brain doesn't exist" });
            return;
        }
        const userId = link.userId;
        const content = await contentModel.find({ userId });
        if (content.length === 0) {
            res.status(404).json({ message: "No content found for this user" });
            return;
        }
        res.status(200).json({
            message: "Content retrieved successfully",
            content,
          });

    }catch(error){
        res.status(500).json({
            message: "Failed to fetch content",
            error: error.errors,
        });
    }
});



export default shareRouter;
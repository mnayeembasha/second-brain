import mongoose, { Schema,Types, Document } from "mongoose";
import { MONGO_URL } from "../config";

const connectDb = async (uri: string): Promise<void> => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("failed to connect to database");
    });
};
connectDb(MONGO_URL);

/*USER SCHEMA */
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String,unique:true, required: true },
  password: { type: String, required: true },
});
export const userModel = mongoose.model<IUser>("User", userSchema);

/*CONTENT SCHEMA */
enum ContentType{
  NOTES="notes",
  TWEET="tweet",
  YOUTUBE="youtube",
  LINK="link", //links other than tweet or youtube video
}
interface IContent extends Document {
  link: string;
  title: string;
  type: ContentType;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}
//Types.ObjectId : TypeScript representation of a MongoDB ObjectId
//Schema.Types.ObjectId : specific to Mongoose's schema definitions
const contentSchema = new Schema<IContent>({
  link:{type:String,required:true},
  title:{type:String,required:true},
  type:{
    type:String,
    enum:Object.values(ContentType),
    required:true,
  },
  tags:[{type:Schema.Types.ObjectId,ref:"Tag"}],
  userId:{type:Schema.Types.ObjectId,ref:"User",required:true
  }
});
export const contentModel = mongoose.model<IContent>('Content',contentSchema);

/* TAG SCHEMA */
interface ITag extends Document {
  name: string;
  createdAt: Date; // Automatically added by timestamps
  updatedAt: Date; // Automatically added by timestamps
}
const tagSchema = new Schema<ITag>({
  name: {
    type: String,required: true,unique: true
  }},
  {
    timestamps:true, //adds createdAt and updatedAt fields automatically
  });
export const tagModel = mongoose.model<ITag>("Tag", tagSchema);


/* LINK SCHEMA */
interface ILink extends Document {
  hash: string;
  userId: Types.ObjectId;
}
const linkSchema = new Schema<ILink>({
  hash:{type:String,required:true},
  userId:{type:Schema.Types.ObjectId,ref:"User",required:true,unique:true}
});
export const linkModel = mongoose.model<ILink>('Link',linkSchema);


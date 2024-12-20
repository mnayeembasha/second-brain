import express from 'express';
import { PORT } from './config';
import userRouter from './routes/user';
import contentRouter from './routes/content';
import shareRouter from './routes/share';
import cors from 'cors';
const app= express();

app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173",
    // methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));


app.use("/api/v1/user",userRouter);
app.use("/api/v1/content",contentRouter);
app.use("/api/v1/brain",shareRouter);



app.get("*",(req,res)=>{
    res.status(404).json({message:"Invalid Route | Page Not Found"});
})

app.listen(PORT);
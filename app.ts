import { Request, Response, Express } from "express";
import express from 'express'
import 'dotenv/config'
import { AppDataSource } from "./db/dbConfig.js";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler.js";
import customerRoute from "./routes/customerRoute.js"

const app: Express = express();
const PORT = process.env.PORT || 5000
app.use(express.json())



app.get('/', (req: Request, res: Response) => {
    res.send("hello world");
})

app.use("/customer" , customerRoute)

app.use(customErrorHandler)
app.use(DefaultErrorHandler) 

AppDataSource.initialize().then(()=>{
    console.log("connected to db");
    
}).catch((error)=>{
    console.log("Failed to connect to db " + error);
})

app.listen(PORT, () => {

    console.log("port is running on the " + PORT);
});



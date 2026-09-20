import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Trust reverse proxy (Render, Vercel, Railway, Cloudflare) for secure cookies
app.set("trust proxy", 1)

//configuring cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


//configuring different source inputs

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

//for public resources
app.use(express.static("public"))

//configuring cookie parser -- secure cookies

app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js";

//routes declartion
app.use("/api/v1/user", userRouter)

// Global JSON Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        statusCode,
        data: null,
        message,
        success: false,
        errors: err.errors || []
    });
});

export {app}
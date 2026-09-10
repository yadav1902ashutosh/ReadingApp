import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

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



export {app}
import express from "express"
//This imports the Express library into your project.

//Think of Express as a toolkit that helps you build a web server easily.
import cors from "cors"
//It allows your frontend and backend to communicate when they are running on different URLs.
//without CORS browser blocks the request

import cookieParser from "cookie-parser"
//it reads cookie sent by the browser, very useful for login systems.

const app = express()
//this creates your express application. Think of it as creating your backend server.

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//app.use :- use this middleware for every request. whenever someone calls your API,Express will first run this middleware.
// credentials: true :- this allows cookies, Authorization headers, sessions to be sent from the frontend.

app.use(express.json({limit: "8mb"}))
app.use(express.urlencoded({extended: true, limit: "8mb"}))
app.use(express.static("public"))

//Only accept JSON data up to 16kb.
//suppose your project has images,logo,css express makes these files publicly accessible.

app.use(cookieParser())

//Every request now automatically parse cookies.
//routes import

import userRouter from "./routes/user.routes.js"
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"


//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register
export{app}
//This exports the Express app so another file (usually server.js or index.js) can import and start the server.
//app.js is responsible for configuring your Express application (middleware, routes, etc.).
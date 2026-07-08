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

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//Only accept JSON data up to 16kb.
//suppose your project has images,logo,css express makes these files publicly accessible.

app.use(cookieParser())

//Every request now automatically parse cookies.


export{app}
//This exports the Express app so another file (usually server.js or index.js) can import and start the server.
//app.js is responsible for configuring your Express application (middleware, routes, etc.).
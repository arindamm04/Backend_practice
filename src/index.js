import dotenv from "dotenv"

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})
//This loads all your private connection strings and secret keys from your environment file


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port :${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("MONGO db connection failed!! ", err);
})

/*Because connectDB is an async function, it automatically returns a Promise. 
This allows you to chain a .then() block after it:
Step 1: Run connectDB() and wait for a successful connection.
Step 2 (.then): If (and only if) the database connects successfully, 
your Express app starts listening for web traffic via app.listen().
It defaults to port 8000 if no environment port is specified.

Step 3 (.catch): If the connection fails, the .catch block triggers, logging the failure message, and the app never starts listening.
*/













/*
import express from "express"
const app = express()


( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on( "error", (error) => {
            console.log("ERRR:", error);
            throw error

        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR", error)
        throw err
        
    }
})()

*/
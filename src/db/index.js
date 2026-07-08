import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"]);
/*What it does: This forces your application to use Cloudflare (1.1.1.1) and Google (8.8.8.8) DNS servers. 
It is a smart safeguard that prevents local ISP network issues from blocking Node.js 
from resolving your MongoDB Atlas cloud URI connection.
*/


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
        
    }
};

export default connectDB;

/* mongoose.connect(...): This is the actual asynchronous connection attempt. 
It combines your connection string (MONGODB_URI from your .env) 
with your specific database name (DB_NAME from your constants file).*/

/*connectionInstance.connection.host: If successful, this logs exactly which cluster server you connected to. 
This is very handy for verifying if you are connected to a production, staging, or local database.*/

/*process.exit(1): If the database connection fails, there is no point in running the rest of your app. 
This line tells Node.js to shut down the entire server application immediately (1 means it stopped due to an error).*/
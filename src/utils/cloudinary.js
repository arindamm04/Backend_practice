import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { url } from "inspector";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return {
            url: response.secure_url,
            public_id: response.public_id
        };

    } catch (error) {
        console.log("Cloudinary Error:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}










//This utility function handles file uploads. 
// Its job is to take a file that has been temporarily saved onto your local server (like an image or video uploaded by a user) 
// and move it safely up to Cloudinary (a cloud storage service for media).

        //localFilePath: The exact location of the file sitting on your server's local storage
        //if (!localFilePath) return null: A quick safety check. 
        // If no file path is provided, the function stops immediately and returns null.
        
        //console.log("file is uploaded on cloudinary", 
        //response.url);(
        
/*await cloudinary.uploader.upload(...): This sends the file over the internet to Cloudinary. 
Because it takes time, it uses await.
{ resource_type: "auto" }: This setting tells Cloudinary to automatically figure out what kind of file it is—whether 
it's an image, a video, or raw audio—so you don't have to hardcode validation rules.
response.url: Once uploaded, Cloudinary responds with a public, 
secure web URL link to that file (which you usually save to your database so you can display it to users later).
fs.unlinkSync(localFilePath): If the upload to Cloudinary fails for any reason 
(e.g., bad internet connection, wrong API keys), your server is still stuck holding that temporary file on its hard drive.
fs.unlinkSync deletes the local file immediately.
*/


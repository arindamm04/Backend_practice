import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
    
    cb(null, file.originalname)
    }
})

export const upload = multer({storage: storage})

/*Multer offers two types of storage: MemoryStorage (keeping files temporarily in RAM as buffer data) and DiskStorage. 
Your code uses diskStorage, which tells Multer to write the incoming file directly onto your server's hard drive.
This is highly recommended for large files like videos or high-res images so your server doesn't run out of memory.*/

/*destination: A function that decides where on your server the uploaded file should be saved.
req and file: Gives you access to the incoming request details and information about the file itself.
cb (Callback): A function you must call to pass information back to Multer.
The first argument is for errors (set to null because everything is fine).
The second argument is the folder path.
Note: In your snippet, you wrote '/tmp/my-uploads'. In your production architecture 
(like the Cloudinary utility we looked at earlier), 
you'll want this to match your local public assets folder, typically written as './public/temp'.*/
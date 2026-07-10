import mongoose, {Schema} from "mongoose";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
},
{
    timestamps: true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User", userSchema)

/*pre("save", ...): This is a Mongoose "hook". It intercepts the data right before it gets written to MongoDB.

this.isModified("password"): If a user updates their avatar but doesn't change their password,
we don't want to encrypt an already encrypted password. 
This line skips encryption unless the password field is actually modified.

bcrypt.hash(...): Uses the bcrypt library to turn a password like "mysecret123" into an unreadable,
random sequence of characters (a hash).
*/

//JWT tokens
/*These methods generate JSON Web Tokens (JWT) for keeping users securely logged in.
Access Token: A short-lived credential containing user data (_id, email, username).
The frontend sends this token along with every request to verify who the user is.

Refresh Token: A long-lived credential containing only the user's _id. 
It is stored safely on the server or a secure cookie to generate new access tokens 
without forcing the user to re-enter their password constantly.
*/
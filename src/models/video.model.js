import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }


}, 
{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)

/*Why an Aggregate Paginate Plugin?
In advanced applications, you don't just fetch plain videos; you run complex data queries called Aggregation Pipelines. 
For example, you might want to:
Filter out videos that are private (isPublished: false).
Join the User collection to get the owner's profile picture and channel name.
Sort them by the highest number of views or newest upload date.
Mongoose's built-in pagination cannot handle these complex pipelines easily*/
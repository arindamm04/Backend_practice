import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = new mongoose.Types.ObjectId(req.user._id)

    const videoStats = await Video.aggregate([
        { $match: { owner: channelId } },
        {
            $group: {
                _id: null,
                totalVideos: { $sum: 1 },
                totalViews: { $sum: "$views" },
                videoIds: { $push: "$_id" }
            }
        }
    ])

    const totalVideos = videoStats[0]?.totalVideos || 0
    const totalViews = videoStats[0]?.totalViews || 0
    const videoIds = videoStats[0]?.videoIds || []

    const [totalSubscribers, totalLikes] = await Promise.all([
        Subscription.countDocuments({ channel: channelId }),
        Like.countDocuments({ video: { $in: videoIds } })
    ])

    const stats = {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes
    }

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "Channel stats fetched successfully"))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = new mongoose.Types.ObjectId(req.user._id)
    const { page = 1, limit = 10 } = req.query

    const pageNum = Math.max(parseInt(page, 10) || 1, 1)
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1)

    const videos = await Video.aggregate([
        { $match: { owner: channelId } },
        { $sort: { createdAt: -1 } },
        { $skip: (pageNum - 1) * limitNum },
        { $limit: limitNum },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" }
            }
        },
        { $project: { likes: 0 } }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Channel videos fetched successfully"))
})

export {
    getChannelStats,
    getChannelVideos
    }

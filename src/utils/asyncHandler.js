const asyncHandler = () => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

//this is used so that whenever we get an error for example like MONGODB crashes then it gives an error result.
//without this asyncHandler we have to use try n catch method in every routes.





export {asyncHandler}
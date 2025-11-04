

const asyncHandler = (fn) => {
     return async(req,res,next) => {
    Promise.resolve(await fn(req,res,next)).catch((error) => next(error)) 
}
}

// const asyncHandler = (fn) => {
//     return async(req,res,next) => {
//         try {
//            await fn(req,res,next)
//         } catch (error) {
//             return res.status(error.code || 500).json({
//                 message : error.message,
//                 success : false
//             })
//         }
//     }
// } 
import handleAsyncError from "./handleAsyncError.js";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import HandleError from "../utils/handleError.js";

export const verifyUserAuth = handleAsyncError(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){                     
        return next(new HandleError('Authentication is missing! Pleaes login to access resource', 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decodedData.id)
    next()
})
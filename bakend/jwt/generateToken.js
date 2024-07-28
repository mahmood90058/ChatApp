// jwt used for security perpuse mtlb jiska baad token rahega wahi chat kr payega apploication me toh ham har user ko token provide krenge jiske paas token rahega woh website ya appplication ko access kr payega

import jwt from "jsonwebtoken"

 export const createTokenAndSaveCookie= (userId,res)=>{

    const token= jwt.sign({userId},process.env.JWT_TOKEN ,{
        expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict"

    })

}


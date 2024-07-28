import User from "../models/User.js";
import bcrypt from "bcrypt"
import {createTokenAndSaveCookie} from "../jwt/generateToken.js"

export const SignUp=async(req,res)=>{
   try{
    const{fullname, email, password, confirmPassword}= req.body;
    if(password!==confirmPassword){
        return res.status(400).json({error:"Passwords do not match"})
    }
    const user=await User.findOne({email})

    if(user){
        return res.status(400).json({error:"User is already registered"})
    }

    const hashPassword= await bcrypt.hash(password,10)


    const newUser= await new User({
        fullname,
        email,
        password:hashPassword
    })
   await newUser.save();
//    jwt function ko call

if (newUser){
    createTokenAndSaveCookie(newUser._id,res);
    res.status(201).json({massage:"user created successfully",
        user:{
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email
    }})

}


   }catch(err){
    console.log(err)
    res.status(500).json({massage:"internal server error"})
   }
}

// login

export const login=async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await User.findOne({email});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({error:"Invalid credentials"})
        }
        createTokenAndSaveCookie(user._id,res);
        res.status(200).json({massage:"user loggedin succesfuly", user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }})
    }catch(err){
        console.log(err)
        res.status(500).json({err: "internal server error"})
    }
}


// logout

export const logOut= async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(201).json({massage:"user logout succefully"})

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }

}




// get alll the users from the backend using get request ans show

export const allUsers = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUser },
      }).select("-password");
      res.status(201).json(filteredUsers);
    } catch (error) {
      console.log("Error in allUsers Controller: " + error);
    }
  };
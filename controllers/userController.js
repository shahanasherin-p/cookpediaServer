const users=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.addUserController=async(req,res)=>{
    console.log("inside addUserController");
    const{username,email,password}=req.body
    try{
        const exisistingUser = await users.findOne({email})
        if(exisistingUser){
            res.status(406).json("User Already Exists.. Please Login!!")
        }else{
            const encryptedPassword =await bcrypt.hash(password,10)
            const newUser =  new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        } 
         
    }catch (error) {
        res.status(401).json(error)
    }
}

exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body

    try{

        const existingEmail=await users.findOne({email})
        if(existingEmail){
            let isUserPasswordMatch=await bcrypt.compare(password,existingEmail.password)
            if(isUserPasswordMatch || password==existingEmail.password){
                const token=jwt.sign({userId:existingEmail._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingEmail,token})
            }else{
                res.status(404).json("Invalid Email or Password")
            }
        }
        else{
            res.status(404).json("User Not Found Please Login")
        }

    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.editUserController=async(req,res)=>{
    console.log("Inside editUserController");
    const {profilePic}=req.body
    const userId=req.userId

    try{
        const exisistingUser=await users.findById({_id:userId})
        exisistingUser.profilePic=profilePic
        await exisistingUser.save()
        res.status(200).json(exisistingUser)
    }
    catch (err){
        res.status(401).json(err)
    }


}

exports.getAllUsersControler=async(req,res)=>{
    console.log("Inside getAllUsersControler");

    try{
        const allUsers=await users.find({"role":"User"})  //.skip(1)
        res.status(200).json(allUsers)
    }
    catch (err){
        res.status(401).json(err)
    }
}
const testimonals=require('../models/testimonyModel')

exports.addTestimonyController=async(req,res)=>{
    console.log("Inside addTestimonyController");
    const {name,email,message}=req.body

    try{
        const newtestimony=new testimonals({name,email,message})
        await newtestimony.save()
        res.status(200).json(newtestimony)
    }
    catch (err){
        res.status(401).json(err)
    }
}

// get all feedback
exports.getAllFeedbackController=async(req,res)=>{
    console.log("Inside getAllFeedbackController ");

    try{
        allFeedbacks=await testimonals.find()
        res.status(200).json(allFeedbacks)
    }
    catch (err){
        re.status(401).json(err)
    }
}


// feedback status update
exports.updateFeedbackStatusController=async(req,res)=>{

    // get feedback id from url parameter
    const {id}=req.params

    // get status of feedback from url query
    const status=req.query.status

    try{
        const existingFeedback=await testimonals.findById({_id:id})
        existingFeedback.status=status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }
    catch (err){
        res.status(401).json(err)
    }
}


// get All Approved feedback
exports.getAllApprovedFeedbackController=async(req,res)=>{
    console.log("Inside getAllFeedbackController ");

    try{
        allApprovedFeedbacks=await testimonals.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    }
    catch (err){
        res.status(401).json(err)
    }
}


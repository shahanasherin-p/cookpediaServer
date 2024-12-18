const saveRecipes=require('../models/saveRecipeModel')

exports.addToSaveRecipeController=async(req,res)=>{
    console.log("Inside addToSaveRecipeController");
    const {id}=req.params
    const userId=req.userId
    const {name,image}=req.body

    try{
        const existingRecipe=await saveRecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json("Selected Recipe already in your collection..Please add another")
        }else{
            const newRecipe=new saveRecipes({recipeId:id,name,image,userId})
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.getUserSavedRecipeController=async(req,res)=>{
    console.log("Inside getUserSavedRecipeController");
    const userId=req.userId
    try{
        const userRecipeCollection=await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }
    catch (err){
        res.status(401).json(err)
    }
}

// remove save recipe -authorised user
exports.removeSaveRecipeController = async(req,res)=>{
    console.log("inside removeSaveRecipeController");
    // get item _id to be removed from req params
    const {id} = req.params
    // remove item from collection using findByIdandDelete
    try{
        const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)
    }catch(err){
        res.status(401).json(err)
    }
    
}
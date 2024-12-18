const { json } = require('express');
const recipes=require('../models/recipeModel')

exports.getAllRecipesController=async(req,res)=>{
    console.log("Inside getAllRecipesController ");
    try{
        const allRecipes=await recipes.find()
        res.status(200).json(allRecipes)
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.getASingleRecipeController=async(req,res)=>{
    console.log("Inside getASingleRecipeController");
    const {id}=req.params
    
    try{
        const recipeDetails=await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.relatedRecipesController=async(req,res)=>{
    console.log("Inside relatedRecipesController");
    const cuisine=req.query.cuisine
    try{
        const allRelatedRecipes=await recipes.find({cuisine})
        res.status(200).json(allRelatedRecipes)
    }
    catch (err){
        res.status(401).json(err)
    }
}


exports.addRecipeController=async(req,res)=>{
    
    console.log("Inside addRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body

    try{
        const existingRecipe=await recipes.findOne({name})
        if(existingRecipe){
            res.status(406).json("Recipe Already Exist in Our Collection !! Please Add Another")
        }
        else{
            const newRecipe= new recipes({name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType})
            await newRecipe.save()
            res.status(200).json(newRecipe) 
        }
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.editRecipeController=async(req,res)=>{
    console.log("Inside editRecipeController ");

    const {id}=req.params
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body

    try{        
            const updatedRecipe=await recipes.findByIdAndUpdate({_id:id},{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},{new:true})
            await updatedRecipe.save()
            res.status(200).json(updatedRecipe)    
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.deleteRecipeController=async(req,res)=>{
    console.log("Inside deleteRecipeController");

    const {id}=req.params

    try{
        const removeRecipe=await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    }
    catch (err){
        res.status(401).json(err)
    }
}
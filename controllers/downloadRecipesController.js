const downloadRecipes=require('../models/downloadModel')

// exports.addToDownloadRecipeController=async(req,res)=>{
//     console.log("Inside addToDownloadRecipeController");
//     const {id}=req.params
//     const userId=req.userId
//     const {name,image,cuisine}=req.body
//     console.log(id,name,image,cuisine,userId);

//     try{
//         const existingRecipe=await downloadRecipes.findOne({recipeId})
//         if (existingRecipe){
//             existingRecipe.count+=1
//             await existingRecipe.save()
//             res.status(200).json(existingRecipe)
//         }
//         else{
//             const newRecipe=new downloadRecipes({
//                 recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId
//             })
//             await newRecipe.save()
//             res.status(200).json(newRecipe)
//         }
//     }
//     catch (err){
//         res.status(401).json(err)
//     }
// }

exports.addToDownloadRecipeController = async (req,res) => {
    console.log("inside addToDownloadRecipeController");
    const {id} = req.params
    const userId=req.userId
      const {image,name,cuisine} = req.body
      try {
          const existingRecipe = await downloadRecipes.findOne({recipeId:id})
          if(existingRecipe){
              existingRecipe.count+=1
              await existingRecipe.save()
              res.status(200).json(existingRecipe)
          }else{
              const newRecipe =  new downloadRecipes({
                  recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId})
              await newRecipe.save()
              res.status(200).json(newRecipe)
          }
      } catch (error) {
          res.status(401).json(error)
      }
}

exports.getUserDownloadListController=async(req,res)=>{
    console.log("Inside getUserDownloadListController");
    const userId=req.userId
    try{
        const allUserDownloads=await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    }
    catch (err){
        res.status(401).json(err)
    }
}

exports.getAllDownloadListControler=async(req,res)=>{
    console.log("Inside getAllDownloadListControler");

    try{
        const allDownloads=await downloadRecipes.find() 
        res.status(200).json(allDownloads)
    }
    catch (err){
        res.status(401).json(err)
    }
}
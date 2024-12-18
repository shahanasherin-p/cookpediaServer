const express=require("express")
const recipeController=require('../controllers/recipeController')
const testimonyController=require('../controllers/testimonyController')
const userController=require('../controllers/userController')
const downloadRecipeController=require('../controllers/downloadRecipesController')
const saveRecipeController=require('../controllers/savrRecipeController')
const jwtMiddleware=require('../middleware/jwtMiddleware')

const router=new express.Router()

// all recipes
router.get("/all-recipes",recipeController.getAllRecipesController)

// add testimony
router.post("/add-testimony",testimonyController.addTestimonyController)

// register
router.post("/register",userController.addUserController)

// login
router.post("/login",userController.loginController)

// get a recipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getASingleRecipeController)

// related recipes
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipesController)

// download Recipes
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipeController.addToDownloadRecipeController)

// save recipes
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addToSaveRecipeController)

// get user recipes
router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getUserSavedRecipeController)

// delete user save  recipes
router.delete("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeSaveRecipeController)

// getAll user downloads
router.get("/user-downloads",jwtMiddleware,downloadRecipeController.getUserDownloadListController)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

// all users
router.get("/all-users",jwtMiddleware,userController.getAllUsersControler)

// all downloads
router.get("/downloads-list",jwtMiddleware,downloadRecipeController.getAllDownloadListControler)

// all feedbacks
router.get("/all-feedbacks",jwtMiddleware,testimonyController.getAllFeedbackController)

// update feedback status
router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateFeedbackStatusController)

// all approved feedbacks
router.get("/all-Approved-feedbacks",testimonyController.getAllApprovedFeedbackController)
 
// add recipe
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

// edit recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)

// edit recipe
router.delete("/recipe/:id/delete",jwtMiddleware,recipeController.deleteRecipeController)





module.exports=router
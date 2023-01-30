import express from "express"
import { getRecipe, getRecipes, likePost } from "../controllers/recipes.js";
const router = express.Router();

/* READ */
router.get("/getRecipes", getRecipes)
router.get("/getRecipe/:id", getRecipe)

router.patch("/likePost/:id", likePost)
//router.patch("/updatePost/:id", updatePost);



export default router;
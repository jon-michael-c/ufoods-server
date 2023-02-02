import Recipes from "../models/Recipe.js";
import Users from "../models/Users.js";

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find({})
        res.status(200).json(recipes)
    } catch(err) {
        res.status(401).json({message: err.message})
    }
}

export const getRecipe = async (req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipes.findById(id); 
        
        res.status(200).json(recipe)

    } catch(err) {
        res.status(401).json({message: err.message})
    }
}

export const likePost = async (req, res) => {
    try {
        console.log("Liking post")
        const { id } = req.params;
        const { userId } = req.body;
        const recipe = await Recipes.findById(id);
        console.log("userId " + userId)
        const isLiked = recipe.likes.get(userId);
        const isDisLiked = recipe.dislikes.get(userId)
        if(isLiked) {
            recipe.likes.delete(userId)
            
            if(isDisLiked) {
                recipe.dislikes.delete(userId)
            } 
        } else {
            recipe.likes.set(userId, true)
        }
        
        await Recipes.findByIdAndUpdate(
            id,
            {likes: recipe.likes, dislikes: recipe.dislikes},
            {new : true}
        )
            
        console.log("updated")
        res.status(200).json({message: "done"})
    
    } catch (err) {
        res.status(401).json({message: err.message})
    }
}

export const search = async (req, res) => {
    try {
        
    } catch (err) {

    }
}
import mongoose from "mongoose";

const ingrSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: ingrSchema }],
  steps: [{ type: String }],
  timers: [{ type: Number }],
  imageURL: {
    type: String,
    required: true,
  },
  originalURL: {
    type: String,
  },
  likes: {
    type: Map,
    of: Boolean
  },
  dislikes: {
    type: Map,
    of: Boolean
  }, 
  stars: {
    type: Map,
    of: Boolean
  }
});

const Recipes = mongoose.model("recipe", RecipeSchema);

export default Recipes

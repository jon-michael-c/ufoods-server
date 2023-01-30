import express from "express";
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv"
import userRoutes from './routes/users.js';
import recipeRoutes from "./routes/recipes.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URL
);

app.use("/users", userRoutes)
app.use("/recipes", recipeRoutes)

/*
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
*/

app.get("/", (req, res) => {
  res.send("Server is running");
});


/*
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.get("/getRecipes", async (req, res) => {
  RecipeModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
*/

app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`);
});

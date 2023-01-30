import express from "express"
import {createUser, getUser, loginUser, signUpUser, removeUser} from "./../controllers/users.js"
const router = express.Router();

/* READ */
router.get("/:id", getUser)

router.patch("/remove/:id", removeUser)

router.post("/createUser", createUser)
router.post("/login", loginUser)
router.post("/signup", signUpUser)

export default router;
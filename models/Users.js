import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const UserSchema = new mongoose.Schema({
  
  email : {
    type: String,
    required: true,
  }, 
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
  }
});

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.collection.findOne({ email : email });
  console.log(user)

  if (!user) {
    throw Error("Incorrect Email");
  }
  


  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return {
    id: user._id.toString(),
    email: user.email,
  };
}

UserSchema.statics.signup = async function(email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await Users.collection.findOne({email})

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
}

const Users = mongoose.model("users", UserSchema);

export default Users;

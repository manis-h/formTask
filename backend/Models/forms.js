import mongoose from "mongoose";
//
const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  email: String,
  dob: String,
  country: String,
  state: String,
  city: String,
});
const forms = mongoose.model("forms", schema);
export default forms;

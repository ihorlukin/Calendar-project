import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   username: {type: String, required: true, unique: true, min: 5, max: 20},
   
  },
  { timestamps: true }
);

const CalendarUser = mongoose.model("CalendarUser", userSchema);

export default CalendarUser;
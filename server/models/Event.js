import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
   title: {type: String, required: true, unique: true},
   description: {type: String},
   date: {type: Number},
   duration: {type: Number},
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CalendarUser",
    required: true
   }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
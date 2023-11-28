import jwt from "jsonwebtoken";
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const {userId} = req.params;
  console.log(userId)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const userInfo = jwt.verify(token, "secretkey");
   
    const events = Event.find({userId: userId})
   
    return res.status(200).json(events);
  } catch (err) {
    return res.status(403).json(err.message);
  }
};

export const createEvent = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const userInfo = jwt.verify(token, "secretkey");
    const event = await Event.create({
      title: req.body.title,
      description: req.body.img,
      duration: req.body.duration,
      date: req.body.date,
    });

    await event.save();
    return res.status(200).json(event);
  } catch (err) {
    console.log(err)
    return res.status(403).json(err.message);
  }
};

export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  try {
    const deletedEvent = await Event.deleteOne({ _id: eventId });

    if (deletedEvent.deletedCount === 0) {
      return res.status(404).json("Post not found.");
    }

    return res.status(200).json(eventId);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
};
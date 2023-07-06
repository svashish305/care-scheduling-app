import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Schedule from "./models/schedule.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/schedule/latest", async (req, res) => {
  try {
    let { start = null, end = null } = req.query;
    start = start ? new Date(start) : null;
    end = end ? new Date(end) : null;
    let schedules = [];
    if (start && end) {
      schedules = await Schedule.find({
        startTime: { $gte: start },
        endTime: { $lte: end },
      }).exec();
    } else {
      schedules = await Schedule.find().exec();
    }
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/schedule/:revision", async (req, res) => {
  try {
    const { id } = req.query;
    let { revision } = req.params;
    revision = parseInt(revision, 10);
    const schedule = await Schedule.findOne({
      _id: id,
      version: revision,
    }).exec();
    res.json(schedule ? [schedule] : []);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/schedule", async (req, res) => {
  try {
    const { startTime, endTime, client, carer } = req.body;
    const newSchedule = new Schedule({
      startTime,
      endTime,
      client,
      carer,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/schedule/visit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, client, carer } = req.body;
    const existingSchedule = await Schedule.findById(id).exec();
    const newVersion = new Schedule({
      startTime,
      endTime,
      client,
      carer,
    });
    newVersion.version = existingSchedule.version + 1;

    const updatedSchedule = await Promise.all([
      newVersion.save(),
      existingSchedule.updateOne({ $set: { latest: false } }),
    ]);
    res.json(updatedSchedule[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/schedule/visit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

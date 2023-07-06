import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    client: {
      type: Number,
      required: true,
      index: true,
    },
    carer: {
      type: Number,
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    version: { 
			type: Number, 
			default: 1 
		},
    latest: { 
			type: Boolean, 
			default: true 
		},
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;

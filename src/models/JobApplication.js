import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    jobUrl: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;

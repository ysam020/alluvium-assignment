import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");

    const feedbackSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        trim: true,
      },
      subject: {
        type: String,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      contact: {
        type: String,
        required: true,
        trim: true,
      },
      status: { type: String, required: true },
      file: {
        type: String,
      },
    });

    const Feedback = new mongoose.model("Feedback", feedbackSchema);

    app.post("/feedback/:email", async (req, res) => {
      const { file, email, subject, message, contact, status } = req.body;
      console.log(req.body);

      try {
        const newFeedback = new Feedback({
          file,
          email,
          subject,
          message,
          contact,
          status,
        });

        const savedFeedback = await newFeedback.save();

        res.status(200).json({
          message: "Feedback added successfully",
          feedback: savedFeedback,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.listen(9002, () => {
      console.log("BE started at port 9002");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import customerRoutes from "./routes/customer.routes";
import tagRoutes from "./routes/tag.routes";
import projectRoutes from "./routes/projects.routes";
import cors from "cors";
import { DB_HOST, PORT, SCOPE_HOST } from "./config/constants";
import sendmail from "./routes/sendmail.routes";


const corsOptions = {
  origin: SCOPE_HOST,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/project", projectRoutes)
app.use("/api/sendmail", sendmail);

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
  } catch (e) {
    console.warn("Server error ", e);
    process.exit(1);
  }
};
start();

app.listen(PORT, () => console.log(`Server up port ${PORT}`));

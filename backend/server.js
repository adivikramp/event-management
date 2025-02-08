require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, DELETE",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/events", eventRouter);
app.use("/api/users", userRouter);

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server is not running");
    process.exit(0);
  }
});

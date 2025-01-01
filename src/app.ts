import express from "express";
import cors from "cors";  // Import CORS middleware
import { connectToDatabase } from "./config/connect";
import { userRoutes } from "./routes/user_routes";

const app = express();

const port = 8080;

app.use(cors());


app.use(express.json()); // Middleware to parse JSON requests

app.use("/users", userRoutes);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

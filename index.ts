import express, { Request, Response } from "express";
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";
import errorHandler from "./src/middleware/error.middleware";
import { connectDB } from "./src/database/db";
import { userAuth } from "./src/middleware/auth.middleware";

const app = express();

const PORT: number = 3000;

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "User created successfully",
    data: null,
  });
});
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// EVERY ROUTE AFTER THIS IS PROTECTED
app.use(userAuth);

app.get("/home", async (req: Request, res: Response) => {
  try {
    console.log("home")
    res.send({
        success: true,
        message: "User created successfully",
        data: req.user,
      });
  } catch (error) {
    console.log(error)
  }
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
  connectDB();
});

import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import { assignToken } from "../utils/jwt";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name, email, password } = req.body;
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password) {
      throw new AppError(400, "Email and password is required");
    }

    const user = await Users.findOne({ email: email });

    if (!user) {
      throw new AppError(401, "User does not exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(401, "Email or password does not match");
    }

    const token = assignToken({userID: user.id});

    res.status(201).send({
      success: true,
      message: "User is signed in successfully",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name, email, password } = req.body;
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    if (!name || !email || !password) {
      throw new AppError(400, "Name, email and password is required");
    }

    const user = await Users.findOne({ email: email });

    if (user) {
      throw new AppError(401, "Email has already been used");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new AppError(400, "Failed to create user. Try again");
    }
    const token = assignToken({userID: newUser.id});
    res.status(201).send({
      success: true,
      message: "User is created successfully",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prisma } from "@repo/db";
import { middleware } from "./middleware.js";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const result = CreateUserSchema.safeParse(req.body); // safeparse returns the error thing where as parse dosent provide error
  if (!result.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const username = result.data.username;
  const password = result.data.password;
  const name = result.data.name;

  const isExists = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (isExists) {
    return res.json({
      message: "Username already exits!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
    },
  });

  res.json({
    message: "Signed up!",
  });
});

app.post("/signin", async (req, res) => {
  const result = SigninSchema.safeParse(req.body);
  if (!result.success) {
    return res.json({
      message: "Incorrect input!",
    });
  }

  const username = result.data.username;
  const password = result.data.password;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return res.json({
      message: "User dosent exits",
    });
  }

  const verifiedHashedPassword = await bcrypt.compare(password, user?.password);

  if (!verifiedHashedPassword) {
    return res.json({
      message: "Invalid credentials!",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({
    message: "Login successful",
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const result = CreateRoomSchema.safeParse(req.body);
  if (!result.success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  //@ts-ignore TODO: fix this
  const userId = req.userId;

  const room = await prisma.room.create({
    data: {
      slug: result.data.name,
      adminId: userId,
    },
  });

  res.json({
    roomId: room.id,
  });
});

app.listen(3001);

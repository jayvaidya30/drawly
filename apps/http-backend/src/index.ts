import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema } from "@repo/common/types";
import { prisma } from "@repo/db";

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

app.post("/signin", async (req, res) => {});

app.post("/room", async (req, res) => {});

app.listen(3001);

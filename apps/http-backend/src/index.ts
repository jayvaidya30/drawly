import express from "express";
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"
import  {CreateUserSchema} from "@repo/common/types"

const app = express();

app.post("/signup", async (req, res) => {});

app.post("/signin", async (req, res) => {});

app.post("/room", async (req, res) => {});

app.listen(3001);

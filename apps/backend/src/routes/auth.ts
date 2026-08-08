import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { safeUserFields } from "./users";

export const authRouter = Router();

const SALT_ROUNDS = 10;

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1).optional(),
});

authRouter.post("/signup", async (req, res, next) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { email, password, name } = parsed.data;

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, name, passwordHash },
      select: safeUserFields,
    });
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      res.status(409).json({ error: "A user with this email already exists" });
      return;
    }
    next(err);
  }
});

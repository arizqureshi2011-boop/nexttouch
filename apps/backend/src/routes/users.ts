import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../prisma";

export const usersRouter = Router();

export const safeUserFields = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

usersRouter.get("/", async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: safeUserFields,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

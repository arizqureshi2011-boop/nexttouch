import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/requireAuth";
import { prisma } from "../prisma";

export const gamesRouter = Router();

gamesRouter.use(requireAuth);

gamesRouter.get("/", async (req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
    });
    res.json(games);
  } catch (err) {
    next(err);
  }
});

const createGameSchema = z.object({
  date: z.coerce.date(),
  opponent: z.string().min(1),
  teamScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  goals: z.number().int().nonnegative().optional(),
  assists: z.number().int().nonnegative().optional(),
  minutesPlayed: z.number().int().nonnegative().optional(),
  notes: z.string().optional(),
});

gamesRouter.post("/", async (req, res, next) => {
  const parsed = createGameSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const game = await prisma.game.create({
      data: { ...parsed.data, userId: req.userId! },
    });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});

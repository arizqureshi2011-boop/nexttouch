import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/requireAuth";
import { prisma } from "../prisma";

export const sessionsRouter = Router();

sessionsRouter.use(requireAuth);

sessionsRouter.get("/", async (req, res, next) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
    });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

const createSessionSchema = z.object({
  date: z.coerce.date(),
  durationMinutes: z.number().int().positive(),
  statValue: z.number().int().optional(),
  notes: z.string().optional(),
});

sessionsRouter.post("/", async (req, res, next) => {
  const parsed = createSessionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const session = await prisma.session.create({
      data: { ...parsed.data, userId: req.userId! },
    });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

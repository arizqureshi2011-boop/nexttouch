import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { authRouter } from "./routes/auth";
import { gamesRouter } from "./routes/games";
import { sessionsRouter } from "./routes/sessions";
import { usersRouter } from "./routes/users";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);
app.use("/games", gamesRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

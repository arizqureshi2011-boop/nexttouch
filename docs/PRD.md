# NextTouch — Product Requirements Document

**Status:** Draft v1
**Owner:** Ariz Qureshi
**Last updated:** 2026-07-31

---

## 1. Vision

NextTouch is a personal soccer training tracker that helps individual players
see their own improvement over time. Most players who train on their own —
outside of official team practice — have no record of what they worked on or
whether it's actually paying off. NextTouch turns scattered, inconsistent
solo practice into a visible, motivating log of progress.

**One-line version:** *"See your soccer improvement, don't just hope for it."*

---

## 2. Users

The primary user is an **individual soccer player who trains independently**,
at least partly outside of formal team sessions — juggling in the backyard,
running drills alone, doing extra reps after team practice. They are
self-directed: no coach is telling them what to log or checking their
progress. They use the product for themselves, not because someone assigned
it to them.

Out of scope for now: coaches, team managers, and parents. They may become
users later (see §6, Future Features), but the MVP is built around a single
player logging their own training.

---

## 3. User Personas

### Persona 1 — "The Grinder" (primary)
- 13–17 years old, plays club or school soccer, trains most days.
- Motivated by visible progress and consistency — streaks, personal bests.
- Frustrated when they can't tell if weeks of practice are actually working.
- Comfortable with apps; low tolerance for anything slow or complicated.

### Persona 2 — "The Casual Improver" (secondary)
- Adult rec-league or pickup player, trains a couple times a week.
- Wants a low-effort way to remember what they worked on last time.
- Not chasing streaks — just wants a simple history, not a big commitment.

Both personas share the same core need: **a fast way to log training and see
it add up over time.** The MVP is designed around that shared need first.

---

## 4. Problems

1. **No record of solo training.** Team stats exist (games, sometimes
   practice attendance), but individual extra work is invisible — even to
   the player doing it.
2. **Motivation decays without evidence of progress.** Without a visible
   trend, it's easy to believe you're not improving and quit training on
   your own.
3. **Existing tools don't fit.** Sports-tracking apps are either built for
   coaches/teams (too heavy, require a team to set up) or are generic
   fitness trackers that don't understand soccer-specific skills (juggles,
   sprint times, shooting accuracy).
4. **Logging friction kills the habit.** If tracking takes more than a
   minute, players stop doing it after a few days.

---

## 5. Features (Full List)

This is the full feature universe for NextTouch. Section 6 marks which of
these are actually in the MVP — most of this list is intentionally **not**
built yet.

- Account creation / login
- Log a training session (date, duration, notes)
- Track specific stat types (e.g. juggle count, sprint time, shots on target)
- History view of past sessions
- Progress chart for a stat over time
- Personal bests / goal setting
- Training streaks
- Suggested drill library
- Reminders / calendar integration
- Friends / leaderboard / social sharing
- Coach or team dashboard
- Video upload for form review
- Mobile app (Expo — the repo is already set up for this)

---

## 6. MVP

The MVP answers exactly one question: **"Can a player log a training session
in under a minute and see their history?"** Nothing else matters until that
works and feels good to use.

**In scope:**
- Sign up / log in (email + password — simplest thing that works)
- Log a training session: date, duration, free-text notes, and 1 numeric
  stat value (e.g. "juggles: 42")
- View a list of past sessions
- View a simple line chart of one stat over time

**Explicitly out of scope for MVP:** drill library, streaks, goals, social
features, coach tools, mobile app, video. All of these require the core
loop (log → view → repeat) to already work and be worth using.

This is a deliberately small MVP. The point of an MVP isn't "the smallest
impressive-looking thing" — it's the smallest thing that tests whether the
core idea actually holds up in real use.

---

## 7. Future Features (Post-MVP)

Roughly in the order they'd make sense to build, each one only after the
previous is validated:

1. **Multiple stat types per session** (not just one number — juggles,
   sprints, shooting accuracy all trackable)
2. **Personal bests + goals** ("beat your juggle record")
3. **Streaks** (consecutive days/weeks trained)
4. **Suggested drills** (a small curated library tied to stat types)
5. **Mobile app** (the Expo app in `apps/mobile` — makes sense once logging
   at the field/practice matters more than logging from a laptop)
6. **Social** (friends, comparing progress, light leaderboard)
7. **Coach/team view** (a coach sees aggregated player progress) — this is
   a genuinely different product surface and would need its own design work

---

## 8. User Stories

Format: *As a [persona], I want to [action], so that [benefit].*

**MVP stories:**
- As The Grinder, I want to create an account, so that my training history
  is saved and private to me.
- As The Grinder, I want to log a training session in under a minute, so
  that I actually keep doing it instead of giving up on tracking.
- As The Casual Improver, I want to see a list of my past sessions, so that
  I can remember what I worked on last time.
- As The Grinder, I want to see a chart of one stat over time, so that I
  have visible proof I'm improving (or not) and can adjust.

**Future stories (not built yet, listed for direction):**
- As The Grinder, I want to see my current training streak, so that I stay
  motivated to train daily.
- As The Casual Improver, I want suggested drills, so that I don't have to
  plan my own training.
- As a Coach, I want to see my team's aggregated training activity, so that
  I know who's putting in extra work.

---

## 9. Technical Requirements

Mapped to the monorepo that already exists in this repo:

| Requirement | Where it lives | Notes |
|---|---|---|
| Web UI (MVP platform) | `apps/web` (Next.js) | Chosen as the first platform — fastest to iterate, no app store review |
| API | `apps/api` (Express + Prisma) | Needs new endpoints: create session, list sessions, get stat history |
| Database | Postgres via Prisma (`apps/api/prisma/schema.prisma`) | Needs a `Session` model (and later a `StatEntry` model) linked to the existing `User` model |
| Shared types | `packages/shared` | `Session`/stat types should live here so web and api agree on shape, same pattern as the existing `User` type |
| Auth | Not yet decided | MVP needs *some* login so sessions belong to a specific person — simplest real option is email + password with a hashed password column on `User` |
| Mobile | `apps/mobile` (Expo) | Explicitly deferred — not touched until after web MVP works |

Non-functional requirements for the MVP:
- Logging a session should take under ~60 seconds end to end.
- Data is private per-user (one player can never see another's sessions).
- Nothing here requires infrastructure beyond a single Postgres database —
  no queues, no background jobs, no third-party services yet.

---

## 10. Success Metrics

Because this is explicitly a learning/portfolio project first, success has
two layers:

**Product signal (does the core idea actually work?):**
- You personally log at least 3 real training sessions per week for 2+
  consecutive weeks (dogfooding — if the builder won't use it, no one will)
- Time to log a session stays under ~60 seconds in practice, not just in
  the plan
- If shared with a few friends/teammates: at least 3 of them log 3+
  sessions in their first two weeks (a very rough proxy for "does this
  matter to someone other than me")

**Learning signal (the other stated goal of this project):**
- You can explain, unprompted, why each architectural decision was made
  (monorepo, Prisma, the auth approach) — not just that it works
- You've written and understood the Prisma schema changes yourself, not
  just accepted generated code

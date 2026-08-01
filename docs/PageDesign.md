# NextTouch — Page Design & Wireframes

**Status:** Draft v2
**Last updated:** 2026-08-01

This document maps every screen in the NextTouch MVP: what it's for, what's
on it, and how a user gets from one page to the next. It's the bridge
between `docs/PRD.md` (what we're building and why) and actual code (how
it's built).

**Changes from v1:** sign up/log in are no longer separate pages — they're
built directly into the Landing Page. Logging a new entry and viewing past
entries are no longer separate pages either — each of Training and Games
is one page that does both.

---

## The 4 pages

1. Landing Page (marketing + sign up + log in)
2. Dashboard (home after login)
3. Training (log a session + view all past sessions)
4. Games (log a game + view all past games)

---

## 1. Landing Page

**Purpose:** The first thing a stranger sees. Explain what NextTouch is,
and let them create an account or log in — right here, no separate page.

**Components:**
- Top nav bar (logo + "Get Started" button that scrolls down to the auth
  section)
- Hero section: headline, tagline ("Analyze. Improve. Elevate."), short
  explanation of what NextTouch does
- Simple "how it works" section (3 short steps: log training, log games,
  watch your progress)
- Auth card, built into the page (not a pop-up): two tabs, **Sign Up**
  and **Log In** — clicking a tab swaps which form shows underneath,
  nothing navigates away
  - Sign Up tab: email, password, confirm password, "Sign Up" button
  - Log In tab: email, password, "Log In" button
- Footer

**Buttons:**
- "Get Started" (nav bar — scrolls down to the auth card)
- "Sign Up" / "Log In" tabs (switch which form is showing)
- "Sign Up" (submits the sign-up form)
- "Log In" (submits the log-in form)

**Layout:** Single scrolling page: nav → hero → how it works → auth card
→ footer. The auth card is the last stop — everything above it exists to
convince someone to reach it.

**User flow:** Visitor arrives → reads hero → scrolls (or clicks **Get
Started**) → reaches the auth card → picks **Sign Up** or **Log In** tab
→ fills form → submits → lands on **Dashboard**, logged in.

```
┌──────────────────────────────────────────────┐
│  [Logo] NextTouch              [Get Started]  │
├──────────────────────────────────────────────┤
│                                                │
│              ⚽  NextTouch                     │
│         Analyze. Improve. Elevate.            │
│    Track your training. See your progress.    │
│                                                │
├──────────────────────────────────────────────┤
│   1. Log it     2. Track it    3. Improve     │
│   Training/games  History/chart  See growth   │
├──────────────────────────────────────────────┤
│                                                │
│         ┌────────────────────────┐            │
│         │ [ Sign Up ] [ Log In ] │  ← tabs     │
│         │                        │            │
│         │  Email                 │            │
│         │  [____________________]│            │
│         │  Password              │            │
│         │  [____________________]│            │
│         │  Confirm Password      │            │
│         │  [____________________]│            │
│         │                        │            │
│         │  [      Sign Up      ] │            │
│         └────────────────────────┘            │
│                                                │
├──────────────────────────────────────────────┤
│              © 2026 NextTouch                 │
└──────────────────────────────────────────────┘
```

---

## 2. Dashboard (Home)

**Purpose:** The hub after logging in. Jump into Training or Games. This
is the page a user sees most often, so it has to be fast and obvious.

**Components:**
- Top nav bar (logo, user's name/email, "Log Out")
- Two big navigation buttons: **Training**, **Games**
- "Recent training" preview — last 1–2 sessions, small
- "Recent games" preview — last 1–2 games, small

**Buttons:**
- "Training" (primary — goes to the Training page)
- "Games" (primary — goes to the Games page)
- "Log Out"

**Layout:** Nav bar at top, then the two big navigation buttons front and
center, then the two recent-activity previews below, each linking to its
full page.

**User flow:** Right after Sign Up/Log In → lands here. Clicks
**Training** → Training page (can log a new session or browse history
there). Clicks **Games** → Games page (same idea).

```
┌──────────────────────────────────────────────┐
│  [Logo] NextTouch      you@email.com [Log Out]│
├──────────────────────────────────────────────┤
│                                                │
│      [    Training    ]  [     Games       ]  │
│                                                │
│   Recent Training                             │
│   ┌──────────────────────────────────────┐    │
│   │ Jul 30 · 45 min · juggles: 63         │    │
│   │ Jul 28 · 30 min · juggles: 58         │    │
│   └──────────────────────────────────────┘    │
│                                                │
│   Recent Games                                │
│   ┌──────────────────────────────────────┐    │
│   │ Jul 27 · vs Riverside · W 3-2         │    │
│   └──────────────────────────────────────┘    │
│                                                │
└──────────────────────────────────────────────┘
```

---

## 3. Training

**Purpose:** Everything training-related in one place — log a new session
in under a minute, and see the full history with a progress chart, on the
same page.

**Components:**
- "Log a session" form, always visible near the top: date, duration,
  tracked stat (e.g. juggle count), notes (optional)
- Progress chart: the tracked stat over time
- List of past sessions below the chart, most recent first

**Buttons:**
- "Save Session" (submits the form — the new session appears in the list
  and chart immediately after)
- "← Back to Dashboard"

**Layout:** Form at the top (quick, get it done first), chart next (the
payoff — "look, I'm improving"), full list at the bottom to browse
everything.

**User flow:** Dashboard → Training → fills the form → clicks **Save
Session** → stays on the same page, sees the new entry appear in the
chart and list. Or: arrives just to scroll through past sessions without
logging anything new.

```
┌──────────────────────────────────────────────┐
│  ← Back to Dashboard                          │
│                                                │
│   Log a Session                               │
│   Date            [ Jul 31, 2026      ▼]      │
│   Duration (min)  [___________________]       │
│   Juggle count    [___________________]       │
│   Notes           [___________________]       │
│                    [   Save Session   ]        │
│                                                │
│   Juggle Count Over Time                      │
│   70┤                              ●          │
│   60┤                    ●    ●               │
│   50┤          ●    ●                         │
│   40┤    ●                                     │
│     └──────────────────────────────────────   │
│      Jul 10   Jul 17   Jul 24   Jul 31         │
│                                                │
│   All Sessions                                │
│   ┌──────────────────────────────────────┐    │
│   │ Jul 31 · 45 min · 63 · "weak foot"    │    │
│   │ Jul 28 · 30 min · 58                  │    │
│   │ Jul 24 · 40 min · 55 · "cones drill"  │    │
│   └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

---

## 4. Games

**Purpose:** Everything game-related in one place — log a real match, and
see the full game history, on the same page. Separate from Training per
the games decision we made together (different data: opponent, score,
personal stats — no duration or a single tracked stat).

**Components:**
- "Log a game" form, always visible near the top: date, opponent, your
  team's score, opponent's score, your goals, your assists, minutes
  played, notes (optional)
- List of past games below, most recent first, each showing the
  auto-computed result (W/L/D from the two scores)

**Buttons:**
- "Save Game" (submits the form)
- "← Back to Dashboard"

**Layout:** Form at the top, same reasoning as Training — log first,
browse after. No chart here (a "progress over time" chart fits a training
stat better than win/loss results, at least for MVP).

**User flow:** Dashboard → Games → fills the form → clicks **Save Game**
→ stays on the same page, sees the new game appear at the top of the
list. Or: arrives just to browse past games.

```
┌──────────────────────────────────────────────┐
│  ← Back to Dashboard                          │
│                                                │
│   Log a Game                                  │
│   Date            [ Jul 31, 2026      ▼]      │
│   Opponent        [___________________]       │
│   Your score [___]    Their score [___]       │
│   Your goals      [___________________]       │
│   Your assists    [___________________]       │
│   Minutes played  [___________________]       │
│   Notes           [___________________]       │
│                     [    Save Game    ]        │
│                                                │
│   All Games                                   │
│   ┌──────────────────────────────────────┐    │
│   │ Jul 27 · vs Riverside · W 3-2         │    │
│   │   1 goal, 1 assist, 70 min            │    │
│   │ Jul 20 · vs Lakeside  · L 1-2         │    │
│   │   0 goals, 1 assist, 90 min           │    │
│   └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

---

## Site map — how the pages connect

```
Landing Page (Sign Up / Log In tabs, built in)
        │
        ▼
    Dashboard
    ├──► Training  (log + history, one page) ──┐
    │                                            │
    └──► Games     (log + history, one page) ──┤
                                                  │
    ◄─────────────── Back to Dashboard ──────────┘
```

Just 4 pages total now. Landing does double duty as marketing + auth;
Training and Games each do double duty as "log new" + "view history."

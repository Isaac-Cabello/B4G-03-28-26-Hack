# 💳 FinanceLit — Financial Literacy & Spending Tracker

> Build4Good Hackathon @ TAMU — 03/28/2026

A full-featured web app that teaches financial literacy, helps you find the right credit card, and tracks your spending — all in one place.

---

## Features

### 📚 Financial Literacy Crash Course
Six interactive lessons covering:
- Why use credit cards (fraud protection, rewards, building credit)
- How credit scores work (FICO factors, ranges, hard vs. soft inquiries)
- How to build credit from scratch (secured cards, authorized users, credit-builder loans)
- How to properly use credit cards (paying in full, utilization, statement dates)
- Self-assessment: Are credit cards right for you?
- Maximizing rewards (category multipliers, sign-up bonuses, transfer partners, trifecta strategy)

### 🎯 Credit Card Finder Survey
6-question personalized survey:
- Primary spending category (dining, groceries, travel, etc.)
- Main goal (travel rewards, cash back, build credit, perks)
- Annual fee preference
- Preferred airline partners
- Preferred hotel chains
- Complexity tolerance

Returns top 3 card recommendations from our database of 10+ cards (no-fee through premium), with match reasons and pros/cons.

### 💰 Financial Tracker
Four sub-sections:
- **Budget Planner** — Set monthly limits per category with the 50/30/20 rule guide; visual progress bars with over-budget warnings
- **Spending Tracker** — Log transactions with auto cash-back calculation per card and category; filter and sort
- **My Cards** — Add credit cards with custom bonus category rates; tracks per-card perk usage
- **Perks & Credits Tracker** — Add annual fee card credits with deadlines; expiration alerts (30-day and 7-day warnings); mark used/unused

All data persists locally via `localStorage`.

---

## Tech Stack
- **React 19** + **Vite 8**
- Vanilla CSS (no UI library)
- `localStorage` for persistence

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

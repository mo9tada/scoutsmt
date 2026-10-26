# Scouts Menzel Temime — Group Platform

[![CI](https://github.com/mo9tada/scoutsmt/actions/workflows/ci.yml/badge.svg)](https://github.com/mo9tada/scoutsmt/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js_15-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232a?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)

A full-stack web platform for a real scout group in Menzel Temime, Tunisia. It replaces paper forms and Facebook posts with one place where families register their children, members follow upcoming events, and leaders manage everything from an admin dashboard.

The interface is in French, for the group's members.

## Features

| For families and members | For leaders (admin dashboard) |
| --- | --- |
| Online registration form (child, parents, contact details, first-time scout) | Review registrations and set their status with notes |
| Upcoming events page | Create, publish and delete events |
| Group hierarchy and branches explained | Session-protected admin area |
| Contact form that stores feedback in the database | |

## Architecture

```
Browser ──► Next.js 15 App Router (React Server Components)
              ├── Server Actions ── admin auth, events, registrations
              ├── Route Handler  ── /api/register
              └── Supabase JS ──► PostgreSQL + Row Level Security
```

- **Server Actions** carry every mutation, and admin-only actions verify the session on the server, not just in the UI.
- **Admin sessions** use an `httpOnly`, `sameSite=strict` cookie signed with HMAC-SHA256, compared in constant time, so it can't be forged or extended.
- **Database schema and RLS policies** are versioned as SQL in [`scripts/`](scripts): profiles, troops, events, registrations, merit badges and ranks.
- **Configuration** comes from environment variables only; no secrets live in the repository.

## Getting started

```bash
git clone https://github.com/mo9tada/scoutsmt.git
cd scoutsmt
npm install --legacy-peer-deps
cp .env.example .env.local   # then fill in your Supabase project and admin secrets
npm run dev
```

Open http://localhost:3000. Create the database by running the SQL files in `scripts/` in the Supabase SQL editor (tables, then RLS policies, then seed data).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (access is enforced by RLS) |
| `ADMIN_PASSWORD` | Password for the admin dashboard |
| `ADMIN_SESSION_SECRET` | Secret used to sign admin session cookies (`openssl rand -base64 32`) |

## Quality

CI on every push type-checks the project with `tsc` and runs a production build.

## Roadmap

- Replace the shared admin password with Supabase Auth roles (`admin`, `leader`) already modelled in the schema
- Member accounts with merit-badge and rank progress
- Email confirmation when a registration is accepted

## Author

Built by **Moktada Zaidi** — [GitHub](https://github.com/mo9tada)

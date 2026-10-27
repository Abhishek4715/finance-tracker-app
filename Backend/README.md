# Finance Tracker

A multi-user personal finance tracker built with Express, TypeScript,
Prisma, and PostgreSQL, with a focus on secure backend design.

## Features
- Track income and expenses with categories
- Per-user data isolation (every query scoped by user)
- Input validation with Zod
- Authentication and authorization (in progress)

## Tech Stack
Node.js, Express, TypeScript, Prisma 7, PostgreSQL, Zod

## Getting Started
1. Clone the repo and run `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL`
3. Run `npx prisma migrate dev`
4. Run `npm run dev`

## Security
See [SECURITY.md](SECURITY.md) for vulnerabilities found and fixed.

## Status
Work in progress.
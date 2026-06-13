# CohortFlow AI — Online Cohort Management Platform

A production-style full-stack EdTech SaaS assignment built with:

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS, TanStack Query, Framer Motion, Sonner Toasts
- **Backend:** NestJS, TypeScript, PostgreSQL, Prisma, JWT Auth, Swagger/OpenAPI
- **Product Features:** Admin, Mentor, Student roles; Courses, Cohorts, Lessons, Assignments, Attendance, Submissions, Feedback, Upload progress, dashboards, caching, loading states, responsive UI.

> Footer includes candidate name/GitHub/LinkedIn as required by the assignment. Update the links in `apps/frontend/src/components/site-footer.tsx`.

---

## Monorepo structure

```txt
cohortflow-ai/
  apps/
    frontend/   # Next.js 16 app
    backend/    # NestJS API
  docker-compose.yml
```

---

## Quick start

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Backend setup

```bash
cd apps/backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run start:dev
```

Backend runs on:

```txt
http://localhost:5000
```

Swagger docs:

```txt
http://localhost:5000/docs
```

### 3. Frontend setup

```bash
cd apps/frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

## Demo accounts after seeding

```txt
Admin:  admin@cohortflow.ai    / Password@123
Mentor: mentor@cohortflow.ai   / Password@123
Student: student@cohortflow.ai / Password@123
```

---

## Important features implemented

### Frontend

- Next.js App Router structure
- React Query API integration
- Query caching and stale time configuration
- Button spinner loading state
- Page-level skeleton loading screens
- Assignment upload progress bar
- Framer Motion animations
- Branded Sonner toast notifications
- Next Image optimization usage
- Protected dashboard UI pattern
- Admin course CRUD example
- Student assignment submission example

### Backend

- NestJS modular API
- PostgreSQL + Prisma schema
- JWT authentication
- Role-based authorization
- ValidationPipe and DTO validation
- Swagger/OpenAPI documentation
- CORS + Helmet
- Course CRUD
- Cohort CRUD
- Assignment CRUD
- Attendance marking
- Submission upload/review
- Local upload folder support
- Seed script

---

## Assignment demo flow

1. Open landing page.
2. Login as Admin.
3. Create a course.
4. Create a cohort.
5. Login as Mentor.
6. Create an assignment.
7. Mark attendance.
8. Login as Student.
9. View assignments.
10. Submit assignment with upload progress.
11. Login as Mentor and review submission.
12. Show Swagger docs.
13. Show GitHub repository and live deployment.

---

## Deployment suggestion

- Frontend: Vercel
- Backend: Render / Railway / VPS
- Database: Neon / Supabase Postgres / Railway Postgres

Set frontend env:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

Set backend env:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_strong_secret
FRONTEND_ORIGIN=https://your-frontend-domain.com
```

---

## Production improvements to mention in README/video

- Use cloud storage such as S3/R2/Supabase Storage for uploaded assignments.
- Add refresh tokens and HTTP-only cookies for stronger auth security.
- Add rate limiting on auth routes.
- Add E2E tests using Playwright.
- Add CI/CD workflow with lint, type check, test, build.
- Add audit logs for admin/mentor actions.
- Add Redis cache for high-traffic APIs.
- Add AI feedback generator using Gemini/Groq/OpenAI.

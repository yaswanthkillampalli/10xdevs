# 10xDevs Portal

A modern full-stack campus portal designed to centralize student and faculty achievements, showcase technical projects, and host academic publications.

## Key Features

- Role-based profiles for students and faculty
- Project portfolios with tech stack, links, and team members
- Document viewing support for academic files
- Certification hub for verified credentials
- JWT-based authentication with bcrypt password hashing

## Tech Stack

- Framework: Next.js 16.2 (App Router)
- Frontend: React 19, Tailwind CSS v4, Lucide Icons
- Forms and validation: React Hook Form, Zod
- Database: MongoDB with Mongoose
- Authentication: jose (JWT), bcrypt
- File handling: React Dropzone

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yaswanthkillampalli/10xdevs.git
cd 10xdevs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Use the sample env file as a template:

```bash
cp .env.example .env.local
```

Then update values in `.env.local`.

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

Live URL: https://10xdevs.yashdev.tech/

## Environment Variables

This project currently uses:

- `MONGODB_URL` for MongoDB connection
- `JWT_SECRET` for signing and verifying auth tokens
- `NODE_ENV` is read automatically by Next.js (`development` or `production`)

See the sample file: [.env.example](.env.example)

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
   app/
      globals.css
      layout.tsx
      page.tsx
      (auth)/
         login/
            page.tsx
         register/
            page.tsx
      api/
         auth/
            login/
               route.ts
            register/
               route.ts
         home/
            route.ts
      home/
         page.tsx
   components/
      UnderConstruction.tsx
      auth/
         LoginForm.tsx
         RegisterForm.tsx
      home/
         StatCard.tsx
      layout/
         Navbar.tsx
   server/
      db/
         connect.ts
      models/
         AcademicWork.ts
         Achievement.ts
         Certification.ts
         Project.ts
         User.ts
```

## Contributing

Please follow the contribution workflow in [CONTRIBUTING.md](CONTRIBUTING.md).

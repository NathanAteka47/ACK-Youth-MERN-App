# ACK Youth Website - MERN Stack Project

## Overview

A web application designed for the Anglican Church of Kenya (ACK) youth ministry to host and manage weekly Bible study sessions. Users can sign up, log in, attend Wednesday sessions, and view past recordings. Admins can manage users, upload/delete sessions, and post blog updates.

## Features

### User Features

* Sign up / Sign in / Forgot Password
* View upcoming Bible study sessions
* Watch recorded sessions (for missed studies)
* Update profile info and profile picture
* Dark mode toggle (saved in localStorage)

### Admin Features

* Admin Dashboard
* View all registered users and attendance logs
* Upload new sessions and posters
* Delete outdated sessions
* Post content in blog section

## Theme

* Anglican style
* Colors: Deep Dark Blue (#001F54), White (#FFFFFF)
* Typography: Clean serif for titles, sans-serif for body

---

# Folder Structure

## Frontend: `client/` (React + TypeScript + Tailwind CSS)

```
client/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Profile.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── Sessions.tsx
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── tailwind.config.ts
├── index.html
├── package.json
└── tsconfig.json
```

## Backend: `server/` (Express + TypeScript + MongoDB)

```
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── sessionRoutes.ts
│   │   └── adminRoutes.ts
│   ├── utils/
│   ├── app.ts
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
```

---

# Development Schedule

| Day       | Tasks                                                                     |
| --------- | ------------------------------------------------------------------------- |
| **Day 1** | Project setup (client + server), install dependencies, MongoDB connection |
| **Day 2** | Build authentication system, protect routes, test JWT                     |
| **Day 3** | Profile page, session CRUD API, admin dashboard UI                        |
| **Day 4** | Final UI styling, dark mode toggle, blog & session recording features     |
| **Day 5** | Testing, polish, deploy frontend (Vercel) and backend (Render/Azure)      |

---

# Authentication Flow

* Users sign in via JWT
* Token stored in `httpOnly` cookie or `localStorage`
* Passwords hashed using `bcrypt`
* Reset password handled via email token
* Admins verified via `role: 'admin'` in user schema

---

# Mongoose Schemas

### User

```ts
{
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profileImage?: string;
  sessionsAttended: ObjectId[];
}
```

### Session

```ts
{
  title: string;
  description: string;
  videoUrl: string;
  date: Date;
  posterImage?: string;
  attendees: ObjectId[];
}
```

---

# Deployment

## Frontend

* Host on Vercel
* Connect GitHub repo
* Set environment variables (VITE\_API\_URL)

## Backend

* Host on Render / Azure Web App
* Connect to MongoDB Atlas
* Set env vars: MONGO\_URI, JWT\_SECRET, EMAIL\_USER, EMAIL\_PASS

## Database

* MongoDB Atlas for sessions and users
# Team Collaboration Platform

A full-stack, Slack/Discord-style team collaboration platform built from scratch — workspaces, channels, real-time messaging, role-based authorization, async email notifications, image sharing, and payments — built as an in-depth, build-in-public engineering project.

> Live build log / progress thread: LinkedIn & X — link in profile.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Real-Time Events](#real-time-events)
- [Roadmap](#roadmap)
- [Screenshots](#screenshots)
- [License](#license)

---

## Overview

This project goes beyond a typical CRUD tutorial app — it's a from-scratch implementation of the core mechanics behind tools like Slack and Discord:

- Multi-tenant **workspaces** with join codes and role-based membership
- **Channels** scoped to a workspace, with real-time messaging via Socket.io Rooms
- **Rich text messages** (bold/italic/lists/links) via Quill, with **image attachments** uploaded directly to AWS S3 using pre-signed URLs
- **JWT authentication**, bcrypt password hashing, and email verification
- **Async background jobs** (welcome emails) via Redis + BullMQ, with a Bull Board dashboard for observability
- **Payments** via Razorpay (in progress)

The backend follows a strict layered architecture (Routes → Controllers → Services → Repositories → Schema) so business logic, authorization, and data access stay cleanly separated. The frontend follows Atomic Design (atoms → molecules → organisms → pages) with Context API for global state and TanStack Query for all server-state management.

---

## Features

### Authentication & Authorization
- Sign up / sign in with JWT issuance and bcrypt password hashing
- Email verification with expiring tokens (configurable via `ENABLE_EMAIL_VERIFICATION`)
- Zod-based request validation as Express middleware
- Consistent success/error response shapes across every endpoint
- Custom `ValidationError` / `ClientError` classes with per-error status codes

### Workspaces
- Create, update, and delete workspaces
- Server-generated, unique join codes (UUID-based) — never trusted from the client
- Auto-admin assignment for the workspace creator, with an auto-created default channel
- Join a workspace via join code (separate authorization flow from admin-added membership)
- Reset join code (admin-only)
- Invite modal with one-click "copy invite link/code"

### Channels
- Create channels within a workspace
- Per-channel authorization — a user must be a workspace member to view or post in a channel
- Channel details modal (name display, edit placeholder)

### Real-Time Messaging
- Socket.io-powered live messaging scoped to **Rooms** (one room per channel) — messages are only broadcast to users actively viewing that channel, not the entire user base
- Acknowledgement callbacks for message delivery confirmation
- Rich text editing via Quill (bold/italic/underline/strike/lists/links), stored and rendered as Quill `ops` objects to preserve formatting exactly
- Image attachments uploaded directly from the browser to S3 via pre-signed URLs (server never touches the raw file)
- Paginated message history with auto-scroll to the latest message

### Members & Direct Access
- Workspace member list surfaced as a sidebar "Direct Messages" section
- Role-aware UI — admin-only actions (invite, preferences, channel management) hidden from regular members

### Notifications
- Async welcome/verification emails via a Redis-backed BullMQ queue — API responses aren't blocked on SMTP round trips
- Bull Board dashboard (`/ui`) for monitoring job success/failure/retries

### Payments
- Razorpay order creation flow (test mode) — in active development

### Frontend
- React + Vite, ShadCN/ui component library, Tailwind CSS
- Context API for auth, workspace, socket, and modal state — combined via a custom `combineContext` utility to avoid deeply nested providers
- TanStack Query for all API calls (caching, mutations, cache invalidation on writes)
- Protected routes based on auth/token state
- Toast notifications (Sonner) for all async operations

---

## Tech Stack

**Backend**
- Node.js, Express.js
- MongoDB + Mongoose
- Redis + BullMQ (job queues) + Bull Board (queue dashboard)
- Socket.io (real-time messaging)
- JWT + bcrypt (auth)
- Zod (validation)
- Nodemailer (email delivery)
- AWS SDK v3 (S3 pre-signed URL uploads)
- Razorpay (payments)

**Frontend**
- React.js (Vite)
- Tailwind CSS + ShadCN/ui
- TanStack Query (React Query)
- React Router DOM
- Socket.io-client
- Quill (rich text editor)
- Axios
- Sonner (toasts)

---

## Architecture

**Backend — layered architecture**

```
Routes  →  Controllers  →  Services  →  Repositories  →  Schema (Mongoose)
```

- **Routes** — endpoint definitions + middleware wiring (auth, validation)
- **Controllers** — request/response handling only, no business logic
- **Services** — all business logic and authorization checks live here
- **Repositories** — the only layer that talks to Mongoose; built on a generic, reusable `crudRepository(model)` for create/getAll/getById/update/delete
- **Schema** — Mongoose models (User, Workspace, Channel, Message)

Real-time messaging follows a parallel path: `Socket Controllers` (message + channel socket handlers) call into the same **Services/Repositories** layers as the REST API, so message creation logic isn't duplicated between HTTP and WebSocket entry points.

**Frontend — Atomic Design + Container/Presenter**

```
atoms/  →  molecules/  →  organisms/  →  pages/
```

- Presentation components (cards, buttons, modals) hold no logic or state
- Container components own state, API hooks, and event handlers
- Global state (auth, current workspace, socket connection, modal visibility) lives in Context, accessed via small custom hooks (`useAuth`, `useCurrentWorkspace`, `useSocket`, etc.)

---

## Project Structure

```
backend/
├── src/
│   ├── config/            # DB, Redis, Mail, AWS, Razorpay, Bull Board config
│   ├── controllers/       # REST + Socket.io controllers
│   ├── middlewares/       # Auth middleware
│   ├── processors/        # BullMQ job processors (mail worker)
│   ├── producers/         # BullMQ job producers
│   ├── queues/            # Queue definitions
│   ├── repositories/      # Data access layer (CRUD + custom queries)
│   ├── routes/v1/         # Versioned API routes
│   ├── schema/             # Mongoose schemas
│   ├── service/             # Business logic + authorization
│   ├── utils/
│   │   ├── common/          # Response shaping, event constants, mail objects
│   │   └── errors/           # Custom error classes
│   ├── validators/           # Zod schemas
│   └── index.js               # App entry point (Express + Socket.io server)

frontend/
├── src/
│   ├── apis/                 # Axios request functions, grouped by domain
│   ├── components/
│   │   ├── atoms/             # Smallest reusable UI pieces
│   │   ├── molecules/         # Composed components (modals, panel sections)
│   │   ├── organisms/         # Larger composed sections (sidebar, navbar)
│   │   └── ui/                 # ShadCN-generated components
│   ├── config/                 # Axios instance config
│   ├── context/                 # React Context providers
│   ├── hooks/
│   │   ├── apis/                 # TanStack Query hooks per domain
│   │   └── context/               # Hooks wrapping useContext
│   ├── pages/                     # Route-level page components
│   ├── utils/                       # combineContext and other utilities
│   ├── App.jsx
│   └── Routes.jsx
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis (local or a hosted free tier, e.g. Upstash)
- An AWS account with an S3 bucket (for image uploads)
- A Razorpay account (test mode is sufficient for local development)

### Installation

```bash
# Clone the repo
git clone https://github.com/aman1-2/Messaging-Chat-App-Project.git
cd Messaging-Chat-App-Project

# Backend
cd backend
npm install
cp .env.example .env   # fill in the values — see below
npm start

# Frontend (in a separate terminal)
cd frontend
npm install
cp .env.example .env   # fill in the values — see below
npm run dev
```

The backend runs on `http://localhost:3000` by default; the frontend (Vite) runs on `http://localhost:5173`.

---

## Environment Variables

**Backend (`backend/.env`)**

| Variable | Description |
|---|---|
| `PORT` | Server port (default `3000`) |
| `NODE_ENV` | `development` or `production` |
| `DEV_DB_URL` / `PROD_DB_URL` | MongoDB connection strings |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRY` | Token expiry (e.g. `1d`) |
| `MAIL_ID` / `MAIL_PASSWORD` | SMTP sender credentials (Gmail app password) |
| `REDIS_HOST` / `REDIS_PORT` | Redis connection details |
| `ENABLE_EMAIL_VERIFICATION` | `true`/`false` — gate signup on email verification |
| `APP_LINK` | Base URL used in verification email links |
| `AWS_REGION` / `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_BUCKET_NAME` | S3 config for image uploads |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API credentials |
| `CURRENCY` | Payment currency (e.g. `INR`) |
| `RECEIPT_SECRET` | Order receipt identifier |

**Frontend (`frontend/.env`)**

| Variable | Description |
|---|---|
| `VITE_BACKEND_API_URL` | Base URL for REST API calls (e.g. `http://127.0.0.1:3000/api/v1`) |
| `VITE_BACKEND_SOCKET_URL` | Base URL for the Socket.io connection (e.g. `http://localhost:3000`) |

> **Never commit `.env` files.** Use `.env.example` (variable names only, no real values) to document what's required.

---

## Real-Time Events

| Event | Direction | Purpose |
|---|---|---|
| `JoinChannel` | Client → Server | Join the Socket.io Room scoped to a channel |
| `NewMessage` | Client → Server | Create a message; persisted via the same service layer as the REST API |
| `NewMessageReceived` | Server → Room | Broadcast a newly created message to everyone in that channel's room only |

---

## Roadmap

- [x] Auth (JWT, bcrypt, email verification)
- [x] Workspaces, channels, roles, join codes
- [x] Real-time messaging with Socket.io Rooms
- [x] Rich text editing (Quill)
- [x] Image uploads via S3 pre-signed URLs
- [x] Async email notifications (Redis + BullMQ)
- [ ] Razorpay payment flow (order creation done; checkout + verification in progress)
- [ ] Direct messages (1:1, outside of workspace channels)
- [ ] Message search (likely via a dedicated search index rather than MongoDB text indexes, given expected message volume)
- [ ] Deployment (Render/Vercel/Atlas/Upstash)

---

## Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b7d97a1c-09a4-4c6b-9857-bb919090bbb1" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2ec75911-0dc9-4edc-87c6-4deeee4ef9bf" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0936b327-9a5b-4c79-9a19-b3747a143cf5" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ff61e33e-2da4-45d1-af36-907ec906b998" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bb65f0e4-1f2c-41cc-ad98-66348090efea" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e2d982e2-66d0-4565-9bd8-940e558152e9" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4f033ac6-6f80-4413-bb5d-2b34b4eb7828" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/acba7385-0d74-4cef-a3c3-b5e64ebdb873" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1c78b77d-b9a1-414f-88a6-e28b3f55cc47" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fbc4526f-f19c-480d-bff2-2159e14d85fd" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/485afdb2-39b8-48d5-bef0-74d35834625e" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7a6d51e5-076f-4b5a-9412-98de701a8b7e" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f9aab5d3-b522-4f2b-895c-04fd9f0a9174" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6a6ec576-3a5e-41b9-9364-5631bc01ab6e" />

<img width="960" height="540" alt="{F48203C7-495C-4F7C-BE6D-4E391D79FE3F}" src="https://github.com/user-attachments/assets/0ba3cc66-0d9c-432c-9fba-3a7f82739bec" />

---

## License

This project is open source and available for reference and learning. Feel free to fork and build on it.

---

## Author

**Aman Pratap Singh**
[LinkedIn](https://linkedin.com/in/aman-pratap-singh12) · [GitHub](https://github.com/aman1-2) · [Medium](https://aman1-2.medium.com)

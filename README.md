# QuickHire

A full-stack job board application where users can browse job listings and submit applications.

**Live Demo**
- Frontend: https://quick-hire-client.vercel.app
- Backend API: https://quick-hire-backend-zeta.vercel.app/api/jobs

---

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Zod (validation)

---

## Project Structure

```
QuickHire/
├── client/   # Next.js frontend
└── backend/  # Express API
```

---

## Running Locally

### 1. Clone the repo


### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

API will be running at `http://localhost:5000`

---

### 3. Frontend

```bash
cd client
npm install
```

Create a `.env.local` file in `/client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

App will be running at `http://localhost:3000`

---

## Environment Variables

### Backend (`/backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default: `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS (production only) |

### Frontend (`/client/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs (supports `?search`, `?category`, `?location`) |
| GET | `/api/jobs/:id` | Get a single job |
| POST | `/api/jobs` | Create a job |
| DELETE | `/api/jobs/:id` | Delete a job |
| POST | `/api/applications` | Submit a job application |

# 🚀 Career Prep Backend

Backend API for the Career Prep Platform — an AI-powered resume builder and interview practice system.

Built with Express, TypeScript, Prisma, and PostgreSQL (Docker).

---

## 🏗 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma 7**
- **PostgreSQL (Docker)**
- **JWT (Authentication - upcoming)**
- **Bcrypt (Password hashing - upcoming)**

---

## 📦 Project Structure

src/
config/ # Prisma & environment config <br>
modules/ # Feature-based modules (auth, resume, interview) <br>
middleware/ # Express middleware (auth, error handling) <br>
app.ts <br>
server.ts <br>

prisma/ <br>
├── schema.prisma <br>
└── migrations/ <br>

docker-compose.yml

## 🐳 Database Setup (Docker)

Start PostgreSQL:

```bash
docker compose up -d
```

Database runs on:

```bash
localhost:5433
```

Stop and remove database:

```bash
docker compose down -v
```

## ⚙️ Environment Variables

Create a .env file in the project root:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/career_prep
PORT=5000
```

## 📦 Install Dependencies

```bash
npm install
```

## 🧬 Run Database Migration

```bash
npx prisma migrate dev --name init
```

## ▶️ Run Development Server

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:5000

```

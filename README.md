# TaskFlow 🚀

A full-stack SaaS task management application where users can register, login, and manage their tasks with real-time updates.

🔗 **Live Demo:** [taskflow-sigma-wine.vercel.app](https://taskflow-sigma-wine.vercel.app)

---

## 📸 Features

- 🔐 User Authentication (Register & Login with JWT)
- ✅ Create, Start, Complete and Delete Tasks
- 📊 Dashboard with real-time task statistics
- 🔒 Protected routes — each user sees only their own tasks
- 💾 Persistent data storage with PostgreSQL
- 📱 Responsive UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI components and state management |
| React Router v6 | Client-side navigation |
| Tailwind CSS | Styling |
| Axios | HTTP requests to backend |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin request handling |

### Database
| Technology | Purpose |
|---|---|
| PostgreSQL | Relational database |
| Prisma ORM | Database queries and migrations |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Render PostgreSQL | Cloud database |

---

## 🏗️ Project Structure
taskflow/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Login & Register page
│   │   ├── Dashboard.jsx    # Stats dashboard
│   │   └── Tasks.jsx        # Task management page
│   ├── App.jsx              # Routes setup
│   └── main.jsx             # Entry point
│
taskflow-backend/
├── prisma/
│   ├── schema.prisma        # Database models
│   └── migrations/          # Database migrations
├── index.js                 # Express server & API routes
├── .env                     # Environment variables
└── package.json

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL installed locally

### 1. Clone the repository
```bash
git clone https://github.com/NikhilRautela/taskflow.git
cd taskflow
```

### 2. Setup Frontend
```bash
npm install
npm run dev
```

### 3. Setup Backend
```bash
cd taskflow-backend
npm install
```

### 4. Setup Environment Variables
Create a `.env` file inside `taskflow-backend`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskflow"
JWT_SECRET="your_secret_key"
```

### 5. Run Database Migrations
```bash
npx prisma migrate dev
```

### 6. Start Backend Server
```bash
npm run dev
```

### 7. Open the app
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Task Routes (Protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks for logged in user |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id/start` | Mark task as In Progress |
| PATCH | `/api/tasks/:id/complete` | Mark task as Done |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  tasks     Task[]
}

model Task {
  id        Int      @id @default(autoincrement())
  title     String
  status    String   @default("To Do")
  createdAt DateTime @default(now())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🔐 How Authentication Works
User registers/logs in
↓
Backend verifies credentials
↓
JWT token generated and sent to frontend
↓
Frontend stores token in localStorage
↓
Every API request sends token in Authorization header
↓
Backend middleware verifies token on every protected route
↓
User's data is returned

---

## 🧠 Key Learnings

- Building and consuming REST APIs
- JWT authentication flow end to end
- PostgreSQL database design with relational models
- Prisma ORM for type-safe database queries
- Connecting React frontend to Express backend
- Debugging production issues using DevTools and server logs
- Deploying full stack apps with automated database migrations

---

## 👨‍💻 Author

**Nikhil Singh Rautela**
- GitHub: [@NikhilRautela](https://github.com/NikhilRautela)
- LinkedIn: [nikhil-singh-rautela](https://www.linkedin.com/in/nikhil-singh-rautela-46487224a/)
- Email: nikhilrautela32@gmail.com

---

⭐ If you found this project helpful, give it a star!

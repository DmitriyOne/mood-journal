# 🧠 Journal Mood

This project runs **NestJS backend**, **React frontend**, **PostgreSQL**, and **pgAdmin** using Docker Compose.  
It is used to create, store, and view mood journal entries.

---

## 🚀 Stack

- **Frontend:** React + Vite  
- **Backend:** NestJS  
- **Database:** PostgreSQL 16  
- **Database UI:** pgAdmin 9.6  
- **Orchestration:** Docker Compose

---

## 📂 Project structure

```
.
├── backend/           # NestJS app
│   ├── src/
│   ├── ops/Dockerfile
│   └── .env.development
│   └── ...
├── frontend-web/      # React 19 + Vite app
│   ├── src/
│   ├── vite.config.ts
│   └── .env.development
│   └── ...
├── database/          # Migrations and SQL files
│   ├── .env.db
│   ├── .env.pgadmin
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment setup

Before running the project, make sure you have these `.env` files:

### 🗂 `database/.env.pgadmin`
```env
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PGADMIN_LISTEN_PORT=
```

### 🗂 `database/.env.db`
```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=
DATABASE_URL=
```

### 🗂 `backend/.env.development`
```env
DATABASE_URL=
PG_USER=
PG_HOST=
PG_DATABASE=
PG_PASSWORD=
PG_PORT=
PORT=
JWT_SECRET=
SALT_ROUNDS=
THROTTLE_TTL=
THROTTLE_LIMIT=
```

### 🗂 `frontend-web/.env.development`
```env
VITE_API_URL=
PORT=
```

---

## ▶️ Run the project

### 1. Build and start all containers
```bash
docker-compose up --build
```

or run in background:
```bash
docker-compose up -d --build
```

---

### 2. Check running containers
```bash
docker ps
```

You should see:
```
postgres_db
nest_backend
frontend_web
pgadmin4_container
database_tools
```

---

### 3. Access the services

| Service           | URL / Port              |
|-------------------|-------------------------|
| Frontend (React)  | http://localhost:5173   |
| Backend (NestJS)  | http://localhost:4000   |
| PostgreSQL DB     | http://localhost:5432   |
| pgAdmin UI        | http://localhost:8080   |

---

## 🧩 Useful commands

### Stop containers
```bash
docker-compose down
```

### Stop and remove all data volumes
```bash
docker-compose down -v
```

### See backend logs
```bash
docker logs nest_backend
```

### Run shell inside container
```bash
docker exec -it {container_name} sh
```

---

## 🗄️ Database migrations
**database_tools** — small Node.js container for database tools and migrations.
Go inside the database container:
```bash
docker exec -it database_tools sh
cd /database
```

Then use the following commands:
### Run all migrations
```bash
npm run migrate
```

### Create a new migration
```bash
npm run migrate:create {name}
```

### Rollback last migration
```bash
npm run migrate:down
```

---

## 🌱 Database seeding
After migrations, you can fill the database with test data.
Inside the same database container:
```bash
npm run seed
```
This will run ts-node ./seed.ts and insert demo data into tables.

---

## 🧭 pgAdmin setup

To connect pgAdmin to your PostgreSQL database:
	1.	Open pgAdmin in your browser → http://localhost:8080￼
	2.	Go to Servers → Register → Server
	3.	In the General tab → set any name you like (for example, Journal DB)
	4.	Go to the Connection tab and fill:
	•	Host name / address → value from .env → POSTGRES_HOST
	•	Port → 5432 (or your port)
	•	Username → value from .env → POSTGRES_USER
	•	Password → value from .env → POSTGRES_PASSWORD
	5.	Click Save

Once connected, open your database, expand Schemas → public → Tables — you should see all tables.

---

## 🔍 Check tables via SQL

You can also verify tables using SQL queries in **Query Tool**.

### List all tables:
```
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

### View data from a specific table:
```
SELECT * FROM table_name;
```

---


### 💬 Conclusion

**Hopefully, you sorted it out — and don’t detest the one who developed it.**

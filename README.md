# Student Feedback & Course Evaluation System

Full-stack mini project using **Node.js + Express + Sequelize + MySQL** and **React.js**.

## Project requirements covered
- REST API with Express
- MySQL database through Sequelize ORM
- 1:M: Course -> Feedback Forms
- M:N: Students <-> Feedback Forms through Evaluations
- CRUD operations
- Validation and constraints
- Advanced filtering endpoint
- Sequelize migrations and seed data
- React Hooks: useState, useEffect, useContext, useMemo
- React Router navigation
- Frontend connected to backend API
- Anonymous evaluation option in the UI (student_id is not sent for anonymous submissions)

## 1. Prerequisites
Install:
- Node.js 18+
- MySQL 8+
- npm

## 2. Database
Open MySQL and run:
```sql
CREATE DATABASE student_feedback_db;
```

Edit `server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=student_feedback_db
DB_USER=root
DB_PASSWORD=your_mysql_password
```

## 3. Backend
Open a terminal:
```bash
cd server
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

## 4. Frontend
Open a second terminal from the project root:
```bash
cd client
npm install
npm run dev
```

Open the URL shown by Vite, normally:
`http://localhost:5173`

## 5. Useful API endpoints
- GET `/api/courses`
- POST `/api/courses`
- GET `/api/courses/:id`
- PUT `/api/courses/:id`
- DELETE `/api/courses/:id`
- GET `/api/instructors`
- POST `/api/instructors`
- GET `/api/students`
- POST `/api/students`
- GET `/api/feedback-forms`
- POST `/api/feedback-forms`
- GET `/api/feedback-forms/:id`
- PUT `/api/feedback-forms/:id`
- DELETE `/api/feedback-forms/:id`
- GET `/api/evaluations`
- POST `/api/evaluations`
- GET `/api/evaluations/summary`
- GET `/api/evaluations/filter?courseId=1&minRating=3`

## 6. Reset database
If you want to start again:
```bash
cd server
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Notes for viva
The `Evaluations` table is the junction table between Students and Feedback Forms. It demonstrates the required M:N relationship. A Course has many Feedback Forms, demonstrating 1:M.

# 📝 Markdown Notes Application

A full-stack Markdown Notes App with real-time preview, CRUD operations, and persistent storage. Built to demonstrate clean architecture, API design, and practical frontend engineering.

---
## 📬 Submission

* Live URL: <https://full-stack-notes-application-assign.vercel.app/>
---
## 🚀 Features

### Core Features

* Create, edit, delete notes
* Real-time Markdown preview (split-screen)
* Persistent storage using SQL database
* Clean and minimal UI

### Markdown Support

* Headings (#, ##, ###)
* Bold and Italic (**bold**, *italic*)
* Ordered & unordered lists
* Inline code & code blocks
* Links

---

## 🧠 Tech Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## 🏗️ Architecture

* Layered architecture (Controller → Service → Repository)
* Separation of concerns
* RESTful API design

---

## 🔌 API Endpoints

### Notes

* `GET /notes` → Get all notes
* `GET /notes/:id` → Get single note
* `POST /notes` → Create note
* `PUT /notes/:id` → Update note
* `DELETE /notes/:id` → Delete note

---

## ⚡ Key Engineering Decisions

* Used debounced auto-save to reduce API calls
* Implemented modular backend structure for scalability
* Used Markdown parser for real-time preview rendering

---

## 📂 Project Structure

### Backend

* `controllers/` → request handling
* `services/` → business logic
* `repositories/` → database queries
* `routes/` → API routes

### Frontend

* `components/` → UI components
* `pages/` → main screens
* `services/` → API calls
* `hooks/` → custom hooks

---

## ⚙️ Setup Instructions

### 1. Clone Repository

* `git clone <repo-url>`
* `cd project-name`

---

### 2. Backend Setup

* `cd backend`
* `npm install`


#### Run Server

* `npm run dev`

---

### 3. Frontend Setup

* `cd frontend`
* `npm install`
* `npm start`

---

## 🌐 Deployment

* Frontend → Vercel
* Backend → Render
* Database - sqllite



---

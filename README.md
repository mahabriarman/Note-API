# 📝 Notes App

A full-stack Notes Management Application built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **EJS**, and **Bootstrap**.

This application allows users to securely create accounts, log in, manage personal notes, search notes, update passwords, and maintain their own private note collection.

---

# 🚀 Features

## 🔐 Authentication

* User Signup
* User Login
* User Logout
* Password Hashing using bcrypt
* Session Management
* Protected Routes

---

## 📝 Notes Management

* Create Notes
* View Notes
* Edit Notes
* Delete Notes
* Search Notes by Title
* User-Specific Notes

---

## 👤 User Profile

* Profile Page
* Total Notes Count
* Account Creation Date
* Change Password

---

## 🛡️ Security

* Password Hashing with bcrypt
* Authentication Middleware
* Authorization Checks
* Session-Based Authentication
* Ownership Verification using `createdBy`

---

## ✅ Validation

* Signup Validation
* Login Validation
* Change Password Validation
* Add Note Validation

---

## 🎨 User Experience

* Responsive Bootstrap UI
* Success Flash Messages
* Error Flash Messages
* Dashboard Statistics
* Search Functionality

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* bcrypt
* express-session
* cookie-parser

## Frontend

* EJS
* Bootstrap 5

---

# 📂 Project Structure

```text
project

├── controller
│   ├── auth.js
│   └── user.js
│
├── middleware
│   └── auth.js
│
├── models
│   ├── auth.js
│   └── user.js
│
├── route
│   ├── auth.js
│   └── user.js
│
├── views
│   ├── login.ejs
│   ├── signup.ejs
│   ├── home.ejs
│   ├── profile.ejs
│   ├── addNote.ejs
│   ├── editNote.ejs
│   ├── viewNote.ejs
│   └── changePassword.ejs
│
├── .env
├── connection.js
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/mahabriarman/Note-API.git
```

## Move Into Project

```bash
cd Note-API
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
MONGO_URL=your_mongodb_connection_string
```

---

## Start Server

```bash
npm start
```

or

```bash
nodemon index.js
```

---

# 📸 Screenshots

Add screenshots here after uploading them.

### Login Page

(Add Screenshot)

### Signup Page

(Add Screenshot)

### Home Page

(Add Screenshot)

### Profile Page

(Add Screenshot)

### Add Note Page

(Add Screenshot)

### View Note Page

(Add Screenshot)

---

# 📚 Concepts Used

* MVC Architecture
* REST Principles
* Authentication
* Authorization
* Middleware
* Sessions
* Password Hashing
* MongoDB Relationships
* CRUD Operations
* Flash Messages
* Form Validation

---

# 🎯 Future Improvements

* Forgot Password
* Email Verification
* JWT Authentication
* Archive Notes
* Dark Mode
* Profile Picture Upload
* Pagination
* Categories

---

# 👨‍💻 Author

**Arman Mahabri**

BSc Computer Science Student

Currently learning:

* Node.js
* Express.js
* MongoDB
* React
* DevOps

---

⭐ If you found this project useful, consider starring the repository.

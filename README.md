<!-- git add .
git commit -m"style added"
git push origin main -->

<h1 align="center">📚 Library Management System 📚</h1>
<h3 align="center">Develop a Library Management System using Express, TypeScript, and MongoDB (via Mongoose). </h3>

<p align="center">
  A full-featured RESTful API for managing books & borrowing in a library.
</p>

## 📖 Overview

This project is managing a library system. It supports operations like adding, updating, deleting, and retrieving books, as well as borrowing books also tracking books & borrow records.

---

## ✅ API Overview

| Sl  | Method | Endpoint           | Description             |
| --- | ------ | ------------------ | ----------------------- |
| 1   | POST   | /api/books         | Create a new Book       |
| 2   | GET    | /api/books         | Get all book            |
| 3   | GET    | /api/books/:bookId | Get book by id          |
| 4   | PUT    | /api/books/:bookId | Update an existing book |
| 5   | DELETE | /api/books/:bookId | Delete a book           |
| 6   | POST   | /api/borrow        | Create Borrow a book    |
| 7   | GET    | /api/borrow        | Borrowed books summary  |

---

## 📂 Structure Overview

src/ </br>
│ </br>
├── app/ </br>
│ ├── controller/
│ │ ├── books.controller.ts
│ │ └── borrow.controller.ts
│ │
│ ├── interface/
│ │ ├── books.interface.ts
│ │ └── borrow.interface.ts
│ │
│ ├── middlewares/
│ │ └── globalErrorHandler.ts
│ │
│ ├── model/
│ ├── books.model.ts
│ └── borrow.model.ts  
│  
│
├── config/
│ └── index.ts
│
├── app.ts
└── server.ts

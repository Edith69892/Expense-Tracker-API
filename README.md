# Expense Tracker API

A RESTful backend API for tracking personal income and expenses, built with **Node.js, Express, and MongoDB**. It supports user authentication, full CRUD on expense transactions, search and filtering, and a dashboard for spending summaries.

## Features

- **Authentication**
  - User registration and login with hashed passwords (bcrypt)
  - JWT-based authentication (access & refresh tokens)
  - Logout (clears auth cookies)
- **Expenses**
  - Add, update, and delete expense/income entries
  - Get all transactions for the logged-in user
  - Search expenses
  - Filter expenses by category
  - Get expenses for a specific month
- **Dashboard**
  - Aggregated summary of the user's financial activity (e.g. balance, totals)
- **Misc**
  - Centralized error handling and standardized API responses (`ApiError`, `ApiResponse`)
  - Async route handler wrapper for clean error propagation

## Tech Stack

| Layer            | Technology                              |
|--------------------|--------------------------------------------|
| Runtime             | Node.js (CommonJS)                          |
| Framework           | Express 5                                    |
| Database            | MongoDB with Mongoose                        |
| Auth                | JSON Web Tokens (jsonwebtoken), bcrypt      |
| Dev Tooling          | Nodemon, dotenv                              |

## Project Structure

```
.
├── app.js                    # Express app setup, middleware, route mounting
├── index.js                  # Entry point: loads env, connects DB, starts server
└── src/
    ├── models/
    │   ├── user.models.js      # User schema (auth, password hashing, token generation)
    │   └── expense.models.js   # Expense schema (title, amount, type, category, date, owner)
    ├── controllers/
    │   ├── user.controller.js     # Register, login, logout logic
    │   ├── expense.controller.js  # CRUD + search/filter logic for expenses
    │   └── dashboard.controller.js # Spending summary logic
    ├── routes/
    │   ├── user.route.js
    │   ├── expense.route.js
    │   └── dashBoard.route.js
    ├── middlewares/
    │   └── auth.middleware.js   # JWT verification (verifyJwt)
    └── utils/
        ├── ApiError.js          # Standardized error class
        ├── ApiResponse.js       # Standardized success response class
        └── asyncHandler.js      # Wraps async route handlers
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Roshan1401/Expense-Tracker-API.git
   cd Expense-Tracker-API
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string

   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

   > **Note:** The current code has a MongoDB connection string hardcoded in `index.js` instead of reading from `MONGODB_URI`. Update `index.js` to use `process.env.MONGODB_URI` before running, and make sure any committed credentials are rotated/removed from git history.

4. Start the development server
   ```bash
   npm run dev
   ```

   The server will start on the port set in `.env` (or wherever `process.env.PORT` resolves).

## API Overview

All routes are prefixed with `/api/v1`. Routes marked 🔒 require authentication via the `verifyJwt` middleware (JWT sent as a cookie).

### Users — `/api/v1/users`

| Method | Endpoint     | Description           |
|--------|----------------|--------------------------|
| POST   | `/register`     | Register a new user      |
| POST   | `/login`        | Log in and receive tokens |
| POST 🔒 | `/logOut`      | Log out                  |

### Expenses — `/api/v1/expense`

| Method | Endpoint              | Description                          |
|--------|-------------------------|------------------------------------------|
| POST 🔒 | `/`                    | Add a new expense                        |
| GET 🔒  | `/`                    | Get all transactions for the user        |
| PATCH 🔒 | `/:expenseId`          | Update an expense                        |
| DELETE 🔒 | `/:expenseId`        | Delete an expense                        |
| GET 🔒  | `/search`               | Search expenses                          |
| GET 🔒  | `/MonthExpense`         | Get expenses for the current month       |
| GET 🔒  | `/filterByCategory`     | Filter expenses by category              |

### Dashboard — `/api/v1/dashboard`

| Method | Endpoint | Description                       |
|--------|------------|---------------------------------------|
| GET 🔒  | `/`        | Get spending summary / dashboard stats |

## Scripts

| Command       | Description                                   |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Starts the server with Nodemon in dev mode         |

## License

ISC

# E-Commerce Full-Stack Website

A responsive full-stack e-commerce application built with React, Node.js, Express and MongoDB.

## Features
- User registration and login with JWT
- Product listing, search and category filtering
- Product details
- Shopping cart
- Wishlist
- Order placement and order history
- Admin dashboard
- Product CRUD operations
- Order status management
- REST APIs
- Responsive UI

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- CSS

## Project structure
```text
ecommerce-fullstack/
├── frontend/
└── backend/
```

## Run locally

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URI`, `JWT_SECRET` and optionally `PORT` in `.env`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Demo admin
Register a normal user, then set `isAdmin: true` for that user in MongoDB to access `/admin`.

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/orders/my`
- `POST /api/orders`
- `GET /api/orders` (admin)
- `PUT /api/orders/:id/status` (admin)

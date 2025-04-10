# 🛒 E-commerce Admin Panel

This project is an E-commerce Admin Panel application built with a **React frontend** and a **Node.js + Express backend**, using **MongoDB** as the database. The project follows the **Repository Architecture** pattern for better separation of concerns and scalability.

## ✨ Features

- 🔐 Admin Authentication (Login / Logout)
- 📊 Revenue Analytics Dashboard
- 📦 Product Management
- 👥 Customer Overview
- 📃 Order Management with detailed order view
- 📈 Sales Report with date filtering
- Clean code structure with Repository Pattern

## 🧱 Tech Stack

### 🔧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- dotenv for environment configuration
- Repository Pattern Architecture



## 🗂️ Project Structure (Backend)

src/
├── config
├── constants
├── controllers
├── helpers
├── middlewares
├── models
├── repository
├── routes
├── service
└── server.js



## ⚙️ Installation & Setup

### **Prerequisites**
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### **Steps to Run the Backend**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arjunr1234/E-Commerce_Backend.git
   cd ecommerce-admin-panel/backend


2. **Install dependencies**
    ```bash
npm install



3. ***Create a .env file in the root of the backend directory and add the following:**



MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
ORIGIN=http://localhost:5173


4. ***Run the development server***


npm run dev
The backend will be running at: http://localhost:5000















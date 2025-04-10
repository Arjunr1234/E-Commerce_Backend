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



## Installation & Setup
### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arjunr1234/E-Commerce_Backend.git
   cd ecommerce-admin-panel/backend

   ```
 **Install dependencies:**
   ```sh
   npm install
   ```
   . **Create a `.env` file in the root  add the following:**
   ```ini
MOGO_URL = mongodb://localhost:27017/ecommmerce
PORT=5000
ORGIN= http://localhost:5173
ACCESSTOKENKEY = " secret key"
   ```



    **Run the development server:**
   ```sh
   npm start
   ```
 The backend will be running at `http://localhost:5000` (or your configured port).






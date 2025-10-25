# 🪄 Referral Backend API

A **Node.js + TypeScript** backend for a referral reward system — featuring authentication, referral tracking, purchases, and leaderboard management.  
Built with **Express**, **MongoDB**, and **Swagger** documentation.  

---

## 🚀 Live API & Documentation

- **Backend Base URL:** [https://referral-backend-69kc.onrender.com](https://referral-backend-69kc.onrender.com)
- **API Docs (Swagger UI):** [https://referral-backend-69kc.onrender.com/api-docs](https://referral-backend-69kc.onrender.com/api-docs)
- **UML Diagram:** [View Database UML](https://app.eraser.io/workspace/QdI4pUCTOMHHtEQ0GPTU?origin=share&elements=th3aeDWdKdKFc_Ur_SFouw)

---

## 🧩 Features

- 🔐 **Authentication**
  - Register, login, and get user profile
  - JWT-based secure authentication

- 🎟️ **Referrals**
  - Apply and track referral codes
  - Reward users when referred purchases are made
  - Leaderboard of top referrers

- 💳 **Purchases**
  - Simulate user purchase
  - Reward referrer and referred users on successful purchase

- 📊 **Dashboard**
  - Get user summary, credits, and referral stats

- 📘 **Swagger API Docs**
  - Automatically generated with `swagger-jsdoc` and `swagger-ui-express`

---

## 🛠️ Tech Stack

- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Auth:** JSON Web Token (JWT)  
- **Validation:** Zod  
- **Documentation:** Swagger UI  
- **Environment:** dotenv  
- **Build Tool:** TypeScript Compiler (tsc)  
- **Package Manager:** pnpm  

---

## ⚙️ Environment Setup

Create a `.env` file in the project root with the following:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://fahad:Letmein123!@cluster0.wpxpee0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=7k9mP2xQ8vL5nR4tY6wE1zA3sD0fG9hJ2kM5nB8cV1xZ4qW7eR3tY6uI0oP2aS5dF8gH1jK4lN7mQ9wE2rT5yU8iO1pA4sD7fG0hJ3kL6zX9cV2bN5mQ8wE1rT4yU7iO0pA3sD6fG9hJ2kL5zX8cV1bN4mQ7wE0rT3yU6i
JWT_EXPIRES_IN=7d
```

---

## 📦 Installation

```bash
# Clone repository
git clone git@github.com:abdullaalfahad/referral-backend.git

# Navigate into the project
cd referral-backend

# Install dependencies
pnpm install
```

---

## 🧑‍💻 Development

Start the server in development mode:

```bash
pnpm run dev
```

---

## 🏗️ Build for Production

```bash
pnpm run build
```

Start the compiled production build:

```bash
pnpm start
```

---

## 🧪 API Documentation

Once the server is running, visit:

```
http://localhost:4000/api-docs
```

You can test all endpoints directly from Swagger UI.

---

## 🧱 Project Structure

```
src/
├── config/
│   ├── db.ts              # Database connection
│   ├── swagger.ts         # Swagger setup
│
├── controllers/
│   ├── auth.controller.ts
│   ├── referral.controller.ts
│   ├── purchase.controller.ts
│   └── dashboard.controller.ts
│
├── middleware/
│   └── error.middleware.ts
│
├── models/
│   ├── user.ts
│   ├── referral.ts
│   └── purchase.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── referral.routes.ts
│   ├── purchase.routes.ts
│   └── dashboard.routes.ts
│
├── utils/
│   └── token.ts           # JWT utilities
│
├── app.ts                 # Express app config
└── index.ts               # Entry point
```

---

## 🧠 UML Diagram

The UML Class Diagram visually represents entities and relationships:
- **User** → has many Referrals and Purchases  
- **Referral** → connects Referrer and Referred Users  
- **Purchase** → belongs to one User  

📊 [View UML Diagram](https://app.eraser.io/workspace/QdI4pUCTOMHHtEQ0GPTU?origin=share&elements=th3aeDWdKdKFc_Ur_SFouw)

---

## 🧾 Scripts

| Command | Description |
|----------|--------------|
| `pnpm dev` | Run in development mode |
| `pnpm build` | Build project with TypeScript |
| `pnpm start` | Run production server |
| `pnpm lint` | Lint project using ESLint |
| `pnpm format` | Format code using Prettier |
| `pnpm docs` | Generate Swagger docs manually |

---

## 🏁 Author

**👤 Abdulla Al Fahad**  
💻 Software Engineer

---

## 🧩 License

This project is licensed under the **ISC License** — feel free to use and modify it.

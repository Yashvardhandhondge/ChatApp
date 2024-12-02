Here’s a **README.md** for your Y-Chat application:  


# Y-Chat

Y-Chat is a real-time chat application that allows users to create and participate in rooms, which can be public or private. It's built as a **Turborepo** with separate packages for the backend and frontend.  


## Live Demo
Check out the live demo here: [Y-Chat Live](https://chat-app-chat-app.vercel.app/)

## Features
- Create public or private chat rooms.
- Real-time messaging in rooms.
- Organized monorepo using Turborepo for scalability and maintainability.
- Database integration with NeonDB.
- JWT-based authentication.



## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites
- Node.js (v16 or later)
- Prisma CLI
- NeonDB account for the database setup

---

### Step-by-Step Setup

#### 1. Root Level Setup
- Clone the repository and navigate to the root directory.
- Create a `.env` file at the root level with the following entry:
  ```env
  DATABASE_URL=your_neondb_url
  ```

---

#### 2. Database Setup
- Navigate to the `packages/db` folder:
  ```bash
  cd packages/db
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Run Prisma migrations and generate Prisma client:
  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```
- To view the database schema or modify it, use:
  ```bash
  npx prisma studio
  ```

---

#### 3. Backend Setup
- Open a new terminal and navigate to the `apps/backend` folder:
  ```bash
  cd apps/backend
  ```
- Set up the `.env` file for the backend:
  ```env
  DATABASE_URL=your_neondb_url
  JWT_SECRET=your_jwt_secret
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```

---

#### 4. Frontend Setup
- Open another terminal and navigate to the `apps/chat-app` folder:
  ```bash
  cd apps/chat-app
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the frontend application:
  ```bash
  npm run dev
  ```

---

### Contribution
This project currently requires separate steps to start individual applications (backend and frontend). However, Turborepo supports starting everything simultaneously. If you're interested in enhancing the setup, feel free to contribute!

---

## Screenshots
Add screenshots of the application here.

1. **Login Page**  
   ![Screenshot 2024-12-02 144727](https://github.com/user-attachments/assets/2b389eea-c977-42ff-8f68-cd7c2fe9a64b)


2. **Chat Room**  
   ![Screenshot 2024-12-02 145118](https://github.com/user-attachments/assets/f4f88462-c065-444c-85bf-48ade6a59238)


3. **Public Rooms List**  
   ![Screenshot 2024-12-02 145145](https://github.com/user-attachments/assets/9fceeb2e-8feb-4a88-8f0d-a3fb8fabd306)


---

## License
This project is open-source and available for contributions. Feel free to use, modify, and share it.


---

## Contact
For any queries, feel free to reach out to the creator of this app.
```

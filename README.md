# TaskFlow

**TaskFlow** is a sleek and efficient task management application built using the MERN stack (MongoDB, Express.js, React, Node.js). It helps users organize their tasks and track their progress to maintain a productive workflow.

## Features

- **Task Management**: Create, edit, and delete tasks.
- **Responsive Design**: Fully responsive UI for seamless experience on any device.
- **User Authentication**: Secure user registration and login with JWT.
- **Real-time Updates**: Real-time task updates without refreshing the page.

## Tech Stack

- **Frontend**: React.js with React Router, Axios for API calls, and styled-components for styling.
- **Backend**: Node.js, Express.js, and MongoDB for the database.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Database**: MongoDB with Mongoose for object modeling.
- **Deployment**: Deployed on Render (Backend) and Vercel (Frontend).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/exclusiveabhi/task-manager.git
   cd task-manager
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add your environment variables:
     ```plaintext
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend` directory and add your environment variables:
     ```plaintext
     REACT_APP_API_URL=http://localhost:5000
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Open your browser and go to `http://localhost:3000`.

## Usage

- Register or log in to your account.
- Start creating tasks by clicking on the "Add Task" button.
- Track the progress of your tasks as you complete them.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. 

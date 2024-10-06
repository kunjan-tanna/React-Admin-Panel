# React Admin Panel

This is a React-based Admin Panel that utilizes **Material UI** for design and **Redux Toolkit** for state management. The panel includes features for managing users, projects, and estimations, with data stored and manipulated via a mock API. The application supports basic CRUD operations and provides visual representations using charts.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Design Choices](#design-choices)

## Installation

To set up and run this project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd React-Admin-Panel

   ```

2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Run the development server:**:

   ```bash
   npm run dev
   ```

## Project Structure

```bash
 src/
 ├── api/
 ├── assets/
 ├── components/
 │   ├── dashboard/
 │   │   ├── EstimationChart.jsx
 │   │   ├── ProjectChart.jsx
 │   │   └── UserChart.jsx
 │   ├── Sidebar.jsx
 │   ├── estimations/
 │   ├── projects/
 │   └── users/
 ├── features/
 │   ├── auth/
 │   │   ├── authActions.js
 │   │   └── authSlice.js
 │   ├── estimations/
 │   ├── projects/
 │   └── users/
 ├── pages/
 │   ├── Dashboard.jsx
 │   ├── Estimations.jsx
 │   ├── ForgotPassword.jsx
 │   ├── LoginForm.jsx
 │   ├── Projects.jsx
 │   ├── Register.jsx
 ├── Routes.jsx
 └── utils/
 └── App.css
 └── App.jsx
 └── data.json
 └── index.css
 └── main.jsx
 └── ProtectedRouter.jsx
```

## Features

### 1. Authentication

- **Login**: A simple login page that authenticates users.
- **Register**: A registration page for new users.
- **Forgot Password**: A password reset feature.

### 2. Dashboard Module

- Displays summary data in the form of charts for users, projects, and estimations.
- Charts are dynamically populated based on the mock API data.

### 3. Projects Module

- List all projects.
- Perform **CRUD** operations (Create, Read, Update, Delete) on projects.
- Filter the projects based on specific criteria.

### 4. Estimations Module

- Basic core functionality is done.
- View subtotals, margins, and summary data for estimations.
- Filter the estimations list based on criteria.

## Design Choices

1. **React + Redux Toolkit**  
   The application is structured around Redux Toolkit for efficient state management. The slices for different modules (auth, projects, estimations, etc.) are organized in the features directory.

2. **Material UI**  
   To ensure a responsive and modern UI, Material UI is used across the project. It provides a consistent look and feel for components like buttons, modals, tables, and forms.

3. **Mock API**  
   For testing and development, the application uses a mock API to simulate backend data fetching and manipulation. This allows for offline development and testing without the need for a live server.

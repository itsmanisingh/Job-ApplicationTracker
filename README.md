# Job Application Tracker

A full-stack web application for tracking and managing job applications in one place.

Built with Next.js, React, MongoDB, Mongoose, JWT authentication, bcrypt, and Tailwind CSS.

## Features

- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- HttpOnly cookies for authentication
- User-specific application data
- Create job applications
- View job applications
- Edit job applications
- Delete job applications
- Search applications by company, position, or location
- Filter applications by status
- Dashboard statistics
- Loading and error states
- Responsive UI

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Password Security:** bcryptjs
- **Language:** JavaScript

## Application Statuses

The application currently supports the following statuses:

- Applied
- Interview
- Rejected
- Offer

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── applications/
│   │   └── auth/
│   ├── applications/
│   │   ├── new/
│   │   └── [id]/
│   │       └── edit/
│   ├── login/
│   ├── register/
│   └── Dashboard.js
│
├── lib/
│   ├── auth.js
│   └── mongodb.js
│
└── models/
    ├── User.js
    └── JobApplication.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/itsmanisingh/Job-ApplicationTracker.git
cd Job-ApplicationTracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the values with your MongoDB connection string and a secure JWT secret.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Applications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get user's applications |
| POST | `/api/applications` | Create an application |
| GET | `/api/applications/:id` | Get a specific application |
| PATCH | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

All application endpoints require authentication.

## Security

The application includes several security measures:

- Passwords are hashed using bcrypt before being stored.
- JWT authentication is used to authenticate users.
- JWT tokens are stored in HttpOnly cookies.
- Users can only access their own job applications.
- Application ownership is verified on update and delete operations.
- Sensitive environment variables are stored in `.env.local` and excluded from Git.

## Dashboard

The dashboard provides an overview of job applications with statistics for:

- Total Applications
- Applied
- Interviews
- Rejected
- Offers

It also provides search and status filtering to make managing applications easier.

## Author

**Mani Singh**

GitHub: [@itsmanisingh](https://github.com/itsmanisingh)

## License

This project is for learning and portfolio purposes.

WTWR (What to Wear) Backend API
A complete Express.js backend API for the "What to Wear" application, integrated with MongoDB for user and clothing item management.
Features

User authentication (signup, login)
User profile management (view, update)
Clothing item CRUD operations (create, read, update, delete)
Like/unlike functionality for clothing items
Comprehensive error handling
JWT-based authentication
RESTful API design


## 🌐 Domains

| Service          | Domain URL                         |
|------------------|-----------------------------------|
| Frontend (React) | https://your-frontend-domain.com   |
| Backend (API)    | https://your-backend-domain.com    |

Technologies

Node.js & Express.js: Backend framework
MongoDB with Mongoose: Database and ORM
JWT: Authentication with JSON Web Tokens
bcryptjs: Password hashing
validator.js: Data validation
ESLint: Code quality
CORS: Cross-origin resource sharing

Installation

Clone the repository:
git clone https://github.com/zeryab-afk/se_project_express.git
cd se_project_express


Install dependencies:
npm install


Ensure MongoDB is running locally:
mongod


Start the server (runs on port 3001):
npm start
# or for development with hot reload
npm run dev



API Endpoints
Authentication (Public)

POST /signup - Create a new user{
  "name": "Test User",
  "avatar": "https://example.com/avatar.jpg",
  "email": "test@example.com",
  "password": "password123"
}


POST /signin - Login user{
  "email": "test@example.com",
  "password": "password123"
}



Users (Protected)

GET /users/me - Get current user info
PATCH /users/me - Update user profile{
  "name": "Updated Name",
  "avatar": "https://example.com/new-avatar.jpg"
}



Clothing Items

GET /items - Get all items (Public)
POST /items - Create new item (Protected){
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}


DELETE /items/:itemId - Delete item (Protected)
PUT /items/:itemId/likes - Like item (Protected)
DELETE /items/:itemId/likes - Unlike item (Protected)

Example Usage
Create User:
curl -X POST http://localhost:3001/signup \
-H "Content-Type: application/json" \
-d '{"name":"Test User","avatar":"https://example.com/avatar.jpg","email":"test@example.com","password":"password123"}'

Login:
curl -X POST http://localhost:3001/signin \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123"}'

Create Clothing Item:
curl -X POST http://localhost:3001/items \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token>" \
-d '{"name":"Winter Jacket","weather":"cold","imageUrl":"https://example.com/jacket.jpg"}'

Project Structure
se_project_express/
├── controllers/         # Route controllers
│   ├── users.js
│   ├── clothingItems.js
│   └── auth.js
├── middleware/          # Middleware functions
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── models/              # Mongoose models
│   ├── user.js
│   └── clothingItem.js
├── routes/              # Express routes
│   ├── index.js
│   ├── users.js
│   ├── clothingItems.js
│   └── auth.js
├── utils/
│   ├── constants.js     # HTTP status constants
│   ├── errors/          # Custom error classes
│   │   ├── BadRequestError.js
│   │   ├── UnauthorizedError.js
│   │   ├── ForbiddenError.js
│   │   ├── NotFoundError.js
│   │   ├── ConflictError.js
│   │   ├── InternalServerError.js
│   │   └── index.js
│   ├── errors.js        # Central export for errors/constants
│   ├── config.js
│   └── logger.js
├── logs/                # Logs (gitignored)
├── .env                 # Environment variables (gitignored)
├── .env.example         # Environment template
├── app.js
├── package.json
├── .gitignore
├── .eslintrc.js
├── .editorconfig
└── README.md

Testing
Run the Postman test suite to verify all endpoints work correctly:
npm test

Run ESLint to ensure code quality:
npm run lint

Key Updates in Sprint 14

Moved /signup and /signin to a dedicated auth.js route file.
Ensured GET /items remains public while other routes are protected by JWT middleware.
Maintained robust error handling and validation for all endpoints.

Notes

Ensure MongoDB is running locally (mongod) before starting the server.
Use MongoDB Compass to manage the database and remove any "test" clothing items if present.
Replace your-secret-key in utils/config.js with a secure environment variable in production.

# WTWR (What to Wear) Backend API

A complete Express.js backend API for the "What to Wear" application with MongoDB integration.

## Features

- User authentication (signup, login)
- User profile management
- Clothing item CRUD operations
- Like/unlike functionality
- Comprehensive error handling
- JWT-based authentication
- RESTful API design

## Technologies

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Validator.js for data validation
- ESLint for code quality

## Installation

1. Install dependencies:
```bash
npm install
bash
npm run dev  # Development with hot reload
npm start    # Production
API Endpoints
Authentication
POST /signup - Create new user

POST /signin - Login user

Users (Protected)
GET /users/me - Get current user info

PATCH /users/me - Update user profile

Clothing Items
GET /items - Get all items (Public)

POST /items - Create new item (Protected)

DELETE /items/:itemId - Delete item (Protected)

PUT /items/:itemId/likes - Like item (Protected)

DELETE /items/:itemId/likes - Unlike item (Protected)

Example Usage
Create User:

bash
POST http://localhost:3001/signup
Content-Type: application/json

{
  "name": "Test User",
  "avatar": "https://example.com/avatar.jpg",
  "email": "test@example.com",
  "password": "password123"
}
Login:

bash
POST http://localhost:3001/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
Create Clothing Item:

bash
POST http://localhost:3001/items
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
Project Structure
text
/controllers    # Route handlers
/models         # Database models  
/routes         # API routes
/middlewares    # Authentication middleware
/utils          # Utilities and configurations
app.js          # Main application
package.json    # Dependencies
Testing
Run the Postman test suite to verify all endpoints work correctly.

text

## Key Fixes Made:

1. ✅ Added trailing commas in all destructuring imports
2. ✅ Added email/password validation in login controller
3. ✅ Improved error handling in login to distinguish between auth errors and server errors
4. ✅ Replaced `StatusCodes.NOT_FOUND` with `ERROR_NOT_FOUND` constant
5. ✅ Added trailing comma in routes/users.js import
6. ✅ Updated README with correct endpoints
7. ✅ Removed all unnecessary comments
8. ✅ Fixed auth middleware placement to keep GET /items public
9. ✅ Added `next` parameter to error handling middleware
10. ✅ Fixed route structure to apply auth middleware correctly

Run `npm run lint` to verify all issues are fixed, then push the changes to GitHub.

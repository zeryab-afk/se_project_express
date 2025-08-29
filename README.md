WTWR (What to Wear) Backend API
A complete Express.js backend API for the "What to Wear" application with MongoDB integration.

🚀 Features
User management (create, read users)

Clothing item CRUD operations

Like/unlike functionality

Comprehensive error handling

RESTful API design

🛠️ Technologies
Node.js & Express.js

MongoDB with Mongoose

Validator.js for data validation

ESLint for code quality

📦 Installation
Install dependencies:

bash
npm install
Start MongoDB locally

Run the server:

bash
npm run dev  # Development with hot reload
npm start    # Production
📡 API Endpoints
Users
GET /users - Get all users

GET /users/:userId - Get user by ID

POST /users - Create new user

Clothing Items
GET /items - Get all items

POST /items - Create new item

DELETE /items/:itemId - Delete item

PUT /items/:itemId/likes - Like item

DELETE /items/:itemId/likes - Unlike item

🔧 Example Usage
Create User:

bash
POST http://localhost:3001/users
Content-Type: application/json

{
  "name": "Test User",
  "avatar": "https://example.com/avatar.jpg"
}
Create Clothing Item:

bash
POST http://localhost:3001/items
Content-Type: application/json

{
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
🏗️ Project Structure
text
/controllers    # Route handlers
/models         # Database models  
/routes         # API routes
/utils          # Utilities
app.js          # Main application
package.json    # Dependencies
🧪 Testing
Run the Postman test suite to verify all endpoints work correctly.

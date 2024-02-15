Simple E-Commerce Platform
This repository contains a simple monolithic web application for an e-commerce platform built with Node.js (TypeScript), Express, and MongoDB. It features user authentication, a product catalogue, and a purchase simulation system, all containerized using Docker and Docker Compose.
--------------------
Features
User Authentication: Secure registration and login functionality, with JWT tokens for session management.
Product Catalogue: Endpoints to add, update, delete, and list products. Open access for viewing products, restricted access for management actions.
Purchase Simulation: Allows authenticated users to simulate the purchase of products, adjusting stock quantities accordingly.
Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v14 or later)
Docker and Docker Compose
A MongoDB instance (local or remote)
Setup Instructions
------------------------------------------------------------------------------------------------------------------------------------------------------
1. Clone the Repository
Clone this repository to your local machine:
git clone https://github.com/HessahSWE/shop
cd shop
------------------------------------------------------------------------------------------------------------------------------------------------------
2. Environment Configuration
the .env file to a new file named .env and update the environment variables to match your setup:

------------------------------------------------------------------------------------------------------------------------------------------------------
3. Install Dependencies
Install the necessary Node.js dependencies:
npm install
------------------------------------------------------------------------------------------------------------------------------------------------------
4. Running the Application with Docker
To start the application and MongoDB using Docker Compose, run:
docker-compose up --build
This command builds the Docker images and starts the containers. Your application should now be accessible at http://localhost:3000.
------------------------------------------------------------------------------------------------------------------------------------------------------
5. Testing Endpoints
You can test the API endpoints using Postman or any other API testing tool. Ensure to include the JWT token in the Authorization header for endpoints that require authentication.
---------------------------------------------------------------------------
API Endpoints
List the available API endpoints, their methods, and a brief description of their functionality, e.g.,
----------------------------------------------------------
POST /api/users/register - Register a new user.
POST /api/users/login - Login an existing user.
GET /api/products - List all products.
POST /api/products - (Authenticated) Add a new product.
PUT /api/products/:id - (Authenticated) Update an existing product.
DELETE /api/products/:id - (Authenticated) Delete a product.
POST /api/purchase/:productId - (Authenticated) Simulate purchasing a product.
--------------------------------------------------
API Endpoint Examples
Register a New User
To register a new user, send a POST request to /api/users/register with the following JSON payload:

json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:
json
{
  "id": "user_id",
  "email": "user@example.com",
  "token": "jwt_token_here"
}
Login an Existing User
For logging in, send a POST request to /api/users/login with the following JSON payload:
//mUsAiLQHNE3g8Vnw
json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:
json
{
  "id": "user_id",
  "email": "user@example.com",
  "token": "jwt_token_here"
}
Add a New Product (Authenticated)
To add a new product, you need to be authenticated. Send a POST request to /api/products with the product details in the JSON payload. Include the JWT token in the Authorization header.

json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "stockQuantity": 100
}
Headers:
makefile
Authorization: Bearer <Your_JWT_Token>
Response:
json
{
  "id": "product_id",
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "stockQuantity": 100,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
------------------------------------------------------------------------------------------------------------------------------------------------------
Development Notes
Include any notes on how to contribute to the project, coding conventions, and how to run tests or generate builds for production.
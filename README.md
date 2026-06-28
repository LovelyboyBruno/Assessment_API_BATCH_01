Assessment Management API

A MERN-stack backend API for managing assessments, questions, authentication, authorization, and student submissions.

Features

Authentication

* User Registration
* User Login
* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes

Authorization

* Admin Role
* Student Role
* Evaluator Role

Assessment Management

* Create Assessment
* View Assessments
* Update Assessment
* Delete Assessment

Question Management

* Create Questions
* Retrieve Questions by Assessment

Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* dotenv

Installation

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the server:

npm run dev

API Endpoints

Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

Assessments

POST /api/assessments

GET /api/assessments

PUT /api/assessments/:id

DELETE /api/assessments/:id

Questions

POST /api/questions

GET /api/questions/:assessmentId

Author

Admin: Joel
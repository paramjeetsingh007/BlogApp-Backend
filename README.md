# BlogApp Backend

## Overview
BlogApp is a full-stack blogging application that allows users to create, read, update, and delete blog posts. This repository contains the backend built with Node.js and Express.js.

## Features
- User authentication using JWT
- CRUD operations for blog posts
- User management (signup, login)
- Secure API endpoints

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based authentication
- **Hosting:** (Specify if deployed, e.g., Render, Vercel, or DigitalOcean)



## Installation
### Prerequisites
Ensure you have the following installed on your system:
- Node.js (>= 14.x)
- npm or yarn
- MongoDB (local or Atlas)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/paramjeetsingh007/BlogApp-Backend.git
   cd BlogApp-Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint         | Description               |
|--------|----------------|---------------------------|
| POST   | /api/auth/signup | User Signup              |
| POST   | /api/auth/login  | User Login               |
| GET    | /api/blogs       | Fetch all blog posts     |
| POST   | /api/blogs       | Create a new blog post   |
| PUT    | /api/blogs/:id   | Update a blog post       |
| DELETE | /api/blogs/:id   | Delete a blog post       |

## Deployment
To deploy the project, follow these steps:
1. Ensure environment variables are set up correctly.
2. Use a cloud hosting service (e.g., Render, Vercel, Heroku, AWS, DigitalOcean) to deploy your backend.
3. Update the frontend API URL to match your deployed backend.

## Contributing
Contributions are welcome! If you'd like to contribute, follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any queries or collaboration, feel free to reach out:
- **GitHub:** [paramjeetsingh007](https://github.com/paramjeetsingh007)
- **Email:** [paramjeetsingh121223@gmail.com] 

Happy coding! 🚀


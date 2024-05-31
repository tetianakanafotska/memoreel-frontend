# Memoreel

Memoreel is a full-stack journal app developed for daily note-taking. It allows users to create notes in various formats including text, YouTube URLs, images, camera images, and audio.

## Features

- User authentication and authorization
- Note creation in multiple formats
- Organized note storage by boards
- Cloudinary integration for media uploads

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Mongoose
- JSON Web Tokens (JWT)
- Cloudinary
- Multer
- Cors

## API Endpoints

- **Index Routes**:

  - `GET /` - Home routes

- **Auth Routes**:

  - `POST /auth/signup` - Sign up a new user
  - `POST /auth/login` - Login a user

- **User Routes** (Protected):

  - `GET /users` - Get all users
  - `GET /users/:id` - Get a single user

- **Boards Routes** (Protected):

  - `GET /boards` - Get all boards
  - `POST /boards` - Create a new board
  - `GET /boards/:id` - Get a single board
  - `PUT /boards/:id` - Update a board
  - `DELETE /boards/:id` - Delete a board

- **Assets Routes**:
  - `GET /assets` - Get all assets
  - `POST /assets` - Create a new asset
  - `GET /assets/:id` - Get a single asset
  - `PUT /assets/:id` - Update an asset
  - `DELETE /assets/:id` - Delete an asset

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
TOKEN_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri

npm install cloudinary multer-storage-cloudinary multer

# Memoreel

Memoreel is a full-stack journal app developed for daily note-taking. It allows users to create notes in various formats including text, YouTube URLs, images, camera images, and audio.

![Memoreel | For days worth remembering](https://github.com/laurasinclair/memoreel-frontend/blob/c24e4fbe7f076088ac5fb42c9e39f3baacb9d193/public/images/memoreel_screenshot.jpg)

## Live demo

[Memoreel | For days worth remembering](https://memoreel-app.netlify.app/)

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
# FlavorShare – MERN Recipe Sharing Application

A full-stack Food Recipe Sharing Blog built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can create, view, edit, delete, and favorite recipes with secure authentication and image uploads.

## Features

### User Authentication
- User registration and login (JWT-based)
- Password hashing using bcrypt
- Protected routes for sensitive actions

### Recipe Management (CRUD)
- Add new recipes with images
- Edit existing recipes
- Delete user-owned recipes
- View list of all recipes
- View individual recipe details

### Like & Favorite System
- Add recipes to favorites
- Remove from favorites
- View favorite recipes

### Image Upload
- Image uploading using Multer
- Cloud storage using Cloudinary

### Frontend Features
- React.js UI
- Responsive design
- Pages: Home, Add Recipe, Edit Recipe, Recipe Details, My Recipes

##  Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer + Cloudinary for image upload

### Tools
- Git & GitHub
- VS Code

## Project Setup

###  Clone the Repository
```bash
git clone https://github.com/your-username/flavorshare.git
cd flavorshare

##Backend setup
cd backend
npm install
npm run dev

##Frontend Setup
cd frontend/food-blog-app
npm install
npm run dev

# Project Structure

backend/
├── config/
│   ├── cloudinary.js
│   └── connectionDb.js
├── controllers/
│   ├── recipe.js
│   └── user.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── recipe.js
│   └── user.js
├── routes/
│   ├── recipe.js
│   └── user.js
└── server.js

frontend/food-blog-app/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── InputForm.jsx
│   │   ├── MainNavigation.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PassInput.jsx
│   │   └── RecipeItems.jsx
│   ├── pages/
│   │   ├── AddFoodRecipe.jsx
│   │   ├── EditRecipe.jsx
│   │   ├── Home.jsx
│   │   └── RecipeDetails.jsx
│   ├── assets/
│   │   └── (various images)
│   ├── App.css
│   ├── App.jsx
│   ├── AppColors.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js

##Backend Dependencies
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^1.41.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.18.2",
  "multer": "^2.0.2",
  "multer-storage-cloudinary": "^4.0.0"
}


##Frontend Dependencies
{
  "axios": "^1.12.2",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.9.3"
}

}
# Key Features Implementation
Image Upload
Uses Multer middleware for file handling
Cloudinary integration for cloud storage
Supports recipe cover images

##Authentication
JWT tokens for secure authentication
Password hashing with bcrypt
Protected routes middleware
Favorites System
Reference-based favorite tracking
Populate method for data retrieval
User-specific favorite management

##✨ Future Improvements
Add comments on recipes
Implement search and filterin
Add rating system
Create admin dashboard
Add recipe categories and tags
Implement social sharing
Add meal planning features


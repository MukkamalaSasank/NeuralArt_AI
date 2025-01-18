# NeuralArt AI

**NeuralArt AI** is a web application that allows users to generate AI-powered art using the **Stable Diffusion XL Base 1.0** model from Hugging Face. Users can create an account, generate art, and share their creations with the community.

---

## Features

- **User Authentication**: Secure login and signup system with JWT-based authentication.
- **AI Art Generation**: Create stunning AI-powered art using Hugging Face's Stable Diffusion model.
- **Post Creation**: Share your art with the community.
- **Gallery**: Browse and explore creations by other users.
- **Responsive Design**: Fully responsive for a seamless experience across devices.

---

## Technologies Used

### **Frontend**
- **React.js**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Icons**: Collection of popular icons.

### **Backend**
- **Node.js**: JavaScript runtime for server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **JWT**: Secure user authentication.
- **Bcrypt.js**: Password hashing.

### **AI Integration**
- **Hugging Face API**: AI-powered art generation using Stable Diffusion.

### **Image Storage**
- **Cloudinary**: Hosting and serving generated images.

### **Development Tools**
- **Vite**: Fast build tool for modern web applications.
- **Nodemon**: Automatically restarts the server during development.
- **Mongoose**: ODM library for MongoDB.

---

## Getting Started

### **Prerequisites**
1. **Node.js**: [Download Node.js](https://nodejs.org/).
2. **MongoDB**: Set up MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Hugging Face API Key**: Obtain from [Hugging Face](https://huggingface.co/).
4. **Cloudinary Account**: Create an account at [Cloudinary](https://cloudinary.com/).

---

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MukkamalaSasank/NeuralArt_AI.git
   cd NeuralArt_AI

2. **Install Dependencies**:
	
   -  Navigate to the client folder and install frontend dependencies:
   	```bash
    cd client
	npm install
   ``` 
   -  Navigate to the server folder and install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```
3. Set Up Environment Variables: Create a .env file in the server folder and add the following variables:
	```env
    MONGODB_URL=your_mongodb_connection_string
	JWT_SECRET=your_jwt_secret_key
	STABILITY_AI_TOKEN=your_hugging_face_api_key
	CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
	CLOUDINARY_API_KEY=your_cloudinary_api_key
	CLOUDINARY_API_SECRET=your_cloudinary_api_secret
	PORT=8080
   ```
4. Run the Application:
	- Start the backend server:
		```bash
    	cd server
        npm start
   		```
    - Start the frontend development server:
    	```bash
        cd ../client
		npm run dev
        ```
5.  Access the Application: Open your browser and navigate to ```http://localhost:5173``` to view the application.
    
   

## **Project Structure**
#### Frontend (```client/```)

- ```src/```: Contains the React application code.
- ```assets/```: Stores static assets like images and logos.
- ```components/```: Reusable React components.
- ```pages/```: Application pages (e.g., Home, LoginRegister, CreatePost).
- ```utils/```: Utility functions (e.g., image download, random prompt generation).
- ```App.jsx```: Main application component.
- ```main.jsx```: Entry point for the React app.

#### Backend (```server/```)

- ```mongodb/```: MongoDB connection and models.
- ```models/```: Mongoose models (e.g., user.js, post.js).
- ```routes/```: Express routes (e.g., authRoutes.js, modelRoutes.js, postRoutes.js).
- ```index.js```: Entry point for the backend server.


## Usage

### Sign Up:
Navigate to the Sign-Up page and create a new account.

### Log In:
Use your credentials to log in to the application.

### Generate Art:
Go to the Create Post page and enter a prompt to generate AI-powered art.

### Explore Gallery:
Browse the gallery to view and interact with posts created by other users.


## API Endpoints

### Authentication

- ```POST /api/v1/auth:``` Handles user login and signup.

### Art Generation

- ```POST /api/v1/model```: Generates AI-powered art using the Hugging Face API.

### Posts

- ```GET /api/v1/post```: Fetches all posts.
- ```POST /api/v1/post```: Creates a new post.


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.


## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Hugging Face: For providing the Stable Diffusion XL Base 1.0 model.
- Cloudinary: For providing image storage and delivery services.
- React Community: For the amazing tools and libraries that made this project possible.


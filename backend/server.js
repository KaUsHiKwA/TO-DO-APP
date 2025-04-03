import express from 'express';
import './config/env.js';
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRouter.js'
import TodoRoutes from './routes/TodoRouter.js';
import auth from './middlewares/auth.js';

const app = express();
app.use(express.json());

// Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB successfully."))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.use(UserRoutes);

app.use(auth);

app.use(TodoRoutes);

app.listen(process.env.PORT || 5000, err => {
    if (err) console.log("Error Connecting: " + err);
    console.log(`Server running at http://localhost:${process.env.PORT}`)
});

export default app;
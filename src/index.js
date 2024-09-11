import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes.js';
import connectDB from './models/db.js'; // Importa la función de conexión a la base de datos
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
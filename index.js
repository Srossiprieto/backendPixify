import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa el middleware CORS
import userRoutes from './routes/users.routes.js';
import connectDB from './models/db.js'; // Importa la función de conexión a la base de datos

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
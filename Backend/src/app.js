import express from 'express';
import cors from 'cors';
import userRoutes from './routes/authRoutes.js'
import blockUnblockRoutes from './routes/blockUnblockRoutes.js'
import outletRoutes from './routes/outletRoutes.js'

const app = express();  

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/block', blockUnblockRoutes);
app.use("/api/outlets", outletRoutes);

export default app;
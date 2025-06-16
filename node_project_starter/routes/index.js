// routes/index.js
import express from 'express';
import emailRoutes from './email.routes.js';
const router = express.Router();

router.use('/', emailRoutes);

export default router;
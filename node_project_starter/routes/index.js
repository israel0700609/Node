// routes/index.js
import express from 'express';
import emailRoutes from './email.routes.js'; // <--- Ensure .js is here

const router = express.Router();

router.use('/', emailRoutes);

export default router;
import express from 'express';
import { notifyCEOs } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifyceos', notifyCEOs);

export default router;

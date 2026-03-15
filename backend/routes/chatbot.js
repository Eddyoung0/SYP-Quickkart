import express from 'express';
import { sendMessageToGemini } from '../Controller/chatbotController.js';

const router = express.Router();

router.post('/message', sendMessageToGemini);

export default router;

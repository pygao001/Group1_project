import express from 'express';
import * as PortfolioController from '../controllers/PortfolioController.js';
const router = express.Router();

router.get('/getportfolio', PortfolioController.Portfoliovalues);


export default router;

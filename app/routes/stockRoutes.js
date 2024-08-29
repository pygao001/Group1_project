// routes/stockRoutes.js

import express from 'express';
import * as stockController from '../controllers/stockController.js';
import * as PortfolioController from '../controllers/PortfolioController.js';


/**
 * express.Router() is a mini Express application without the views or settings.
    It's used to handle routing for different parts of your app. 
    You can think of it as a way to create a new "sub-application" that you can use in your main application.
**/
const router = express.Router();

router.get('/', stockController.getstocks);
// router.get('/:id', stockController.getstockById);
router.post('/', stockController.createstock);
router.put('/:id', stockController.updatestock);
router.delete('/:id', stockController.deletestock);
router.post('/getstocks', stockController.getStocks); //fetching data for line chart
router.get('/getMystocks', stockController.getMyStocks); // fetching data for my shares
router.post('/addMystocks', stockController.addMyStocks); // buying a new stock
router.get('/getAllStocksList', stockController.getAllStocksList); // when buying stocks, retrieve all the stocks in the db
router.get('/getMyStocksList', stockController.getMyStocksList); // when selling stocks, retrieve all the stocks that i have
router.post('/sellStocks', stockController.sellStocks); // when selling stocks, retrieve all the stocks that i have
router.get('/getportfolio', PortfolioController.Portfoliovalues);


export default router;
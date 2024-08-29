// routes/artistRoutes.js

import express from 'express';
import * as artistController from '../controllers/artistController.js';
import * as PortfolioController from '../controllers/PortfolioController.js';


/**
 * express.Router() is a mini Express application without the views or settings.
    It's used to handle routing for different parts of your app. 
    You can think of it as a way to create a new "sub-application" that you can use in your main application.
**/
const router = express.Router();

router.get('/', artistController.getArtists);
// router.get('/:id', artistController.getArtistById);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);
router.post('/getstocks', artistController.getStocks); //fetching data for line chart
router.get('/getMystocks', artistController.getMyStocks); // fetching data for my shares
router.post('/addMystocks', artistController.addMyStocks); // buying a new stock
router.get('/getAllStocksList', artistController.getAllStocksList); // when buying stocks, retrieve all the stocks in the db
router.get('/getMyStocksList', artistController.getMyStocksList); // when selling stocks, retrieve all the stocks that i have
router.post('/sellStocks', artistController.sellStocks); // when selling stocks, retrieve all the stocks that i have
router.get('/getportfolio', PortfolioController.Portfoliovalues);


export default router;
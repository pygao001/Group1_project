
import * as artistService from '../services/artistService.js';



export const getArtists = async (req, res) => {
    try {
        const artists = await artistService.getAllArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getArtistById = async (req, res) => {
    try {
        const artist = await artistService.getArtistById(req.params.id);
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).send('Artist not found123');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createArtist = async (req, res) => {
    try {
        const newArtist = await artistService.createArtist(req.body);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateArtist = async (req, res) => {
    try {
        const updatedArtist = await artistService.updateArtist(req.params.id, req.body);
        if (updatedArtist) {
            res.json(updatedArtist);
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteArtist = async (req, res) => {
    try {
        const deleted = await artistService.deleteArtist(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getStocks = async (req, res) => {
    try {
        console.log('debug', req.body)
        const { startDate, endDate } = req.body;
        const stockData = await artistService.getStocks(startDate, endDate);

        if (stockData && stockData.length > 0) {
            const transformedData = stockData.reduce((acc, curr) => {
                const stock = acc.find(item => item.stock_name === curr.ticker);
                if (stock) {
                    stock.price.push(curr.c);
                } else {
                    acc.push({
                        stock_name: curr.ticker,
                        price: [curr.c]
                    });
                }
                return acc;
            }, []);
            res.status(200).json(transformedData); // 使用 200 状态码返回数据
        } else {
            res.status(404).send('No stocks found');
        }
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).send(error.message);
    }
};

export const getMyStocks = async (req, res) => {
    try {
        const mystocks = await artistService.getMyStocks();
        if (mystocks) {
            res.json(mystocks)
        } else {
            res.status(404).send('error');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addMyStocks = async (req, res) => {
    try {
        const { stock_name, price ,shares} = req.body; 
        const stockAddingResult = await artistService.addMyStocks(stock_name, shares,price);
        if (stockAddingResult) {
            res.json(stockAddingResult)
        } else {
            res.status(404).send('error');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const getAllStocksList = async (req, res) => {
    try {
        const allStocksList = await artistService.getAllStocksList();
        res.json(allStocksList);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getMyStocksList = async (req, res) => {
    try {
        const myStocksList = await artistService.getMyStocksList();
        res.json(myStocksList);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const sellStocks = async (req, res) => {
    try {
        const { stock_name, shares  } = req.body;
        console.log('debug',req.body)
        const sellResult = await artistService.sellStocks(stock_name, shares);
        res.json(sellResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
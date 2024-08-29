
import * as stockService from '../services/stockService.js';



export const getstocks = async (req, res) => {
    try {
        const stocks = await stockService.getAllstocks();
        res.json(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getstockById = async (req, res) => {
    try {
        const stock = await stockService.getstockById(req.params.id);
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).send('stock not found123');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createstock = async (req, res) => {
    try {
        const newstock = await stockService.createstock(req.body);
        res.status(201).json(newstock);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updatestock = async (req, res) => {
    try {
        const updatedstock = await stockService.updatestock(req.params.id, req.body);
        if (updatedstock) {
            res.json(updatedstock);
        } else {
            res.status(404).send('stock not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deletestock = async (req, res) => {
    try {
        const deleted = await stockService.deletestock(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('stock not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getStocks = async (req, res) => {
    try {
        console.log('debug', req.body)
        const { startDate, endDate } = req.body;
        const stockData = await stockService.getStocks(startDate, endDate);

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
        const mystocks = await stockService.getMyStocks();
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
        const stockAddingResult = await stockService.addMyStocks(stock_name, shares,price);
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
        const allStocksList = await stockService.getAllStocksList();
        res.json(allStocksList);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getMyStocksList = async (req, res) => {
    try {
        const myStocksList = await stockService.getMyStocksList();
        res.json(myStocksList);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const sellStocks = async (req, res) => {
    try {
        console.log('hello',req.body)
        const { stock_name, shares  } = req.body;
        console.log('debug1111',stock_name,shares)
        const sellResult = await stockService.sellStocks(stock_name, shares);
        res.json(sellResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
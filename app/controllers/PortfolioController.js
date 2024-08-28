import * as artistService from '../services/artistService.js';
//add by tony
//necessary functions
// Calculate portfolio values
const calculatePortfolioValues = (groupedData, sharesBought) => {
    return Object.entries(groupedData).map(([date, entries]) => {
      const totalValue = entries.reduce((sum, { ticker, currentPrice }) => {
        const shares = sharesBought[ticker] || 0;
        return sum + (shares * currentPrice);
      }, 0);
  
      return { time: date, portfolioValue: totalValue };
    });
  };

  const weights = {
    'GOOG': 2500,
    'AMZN': 1500,
    'AAPL': 3000,
    'META': 2000,
    'NVDA': 1000
  };
  

export const Portfoliovalues = async (req, res) => {
    try {
        const stockData = await artistService.getStocks_old();
        
        if (stockData && stockData.length > 0) {
            
            // Step 1: Store initial prices and calculate number of shares bought
            const initialPrices = {};
            const sharesBought = {};

            stockData.forEach(({ ticker, c, t }) => {
                //const date = (typeof t === 'string' ? new Date(t) : t).toISOString().split('T')[0];
                const date = t;
                if (!initialPrices[ticker]) {
                initialPrices[ticker] = c;
                sharesBought[ticker] = weights[ticker] / c; // Number of shares bought
                }
            });
            
                    
            // Step 2: Calculate portfolio value and group data by time
            const groupedByTime = stockData.reduce((acc, { ticker, c, t }) => {
                const date = (typeof t === 'string' ? new Date(t) : t).toISOString().split('T')[0];
                if (!acc[date]) acc[date] = [];
                acc[date].push({ ticker, currentPrice: c });
                return acc;
            }, {});

            const portfolioValues = calculatePortfolioValues(groupedByTime, sharesBought);

  
            
            res.status(200).json(portfolioValues);
            

           } else {
            res.status(404).send('No stocks found');
        }
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).send(error.message);
    }
};
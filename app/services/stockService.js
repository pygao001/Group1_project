// services/stockService.js
import connection from '../config/db.js';

const getAllstocks = async () => {
    const [rows] = await connection.query('SELECT * FROM stock');
    return rows;
};

const getstockById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM stock WHERE id = ?', [id]);
    return rows[0];
};

const createstock = async (stockData) => {
    const { name, country, numberOfMembers, style } = stockData;
    const [result] = await connection.query(
        'INSERT INTO stock (name, country, numberOfMembers, style) VALUES (?, ?, ?, ?)',
        [name, country, numberOfMembers, style]
    );
    return { id: result.insertId, ...stockData };
};

const updatestock = async (id, stockData) => {
    const { name, country, numberOfMembers, style } = stockData;
    const [result] = await connection.query(
        'UPDATE stock SET name = ?, country = ?, numberOfMembers = ?, style = ? WHERE id = ?',
        [name, country, numberOfMembers, style, id]
    );
    return result.affectedRows > 0 ? { id, ...stockData } : null;
};

const deletestock = async (id) => {
    const [result] = await connection.query('DELETE FROM stock WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const currentDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return (currentDate);
}



const getMyStocks = async () => {
    const [result] = await connection.query(
        `SELECT share_name, shares, buy_in_date, buy_in_price FROM stock_transactions  `
    );

    return result
};


// const getStocks_old = async () => {
//     const [result] = await connection.query(
//         `SELECT ticker,c,t FROM daily_price WHERE t >= '2023-01-03' AND t <= '2023-01-20 order by t'`
//     );

//     return result;
// };

const getStocks = async (startDate, endDate) => {
    console.log(startDate, endDate)
    const [result] = await connection.query(
        `SELECT ticker,c FROM daily_price WHERE t >= ? AND t <= ? order by t `, [startDate, endDate]
    );

    return result;
};

const addMyStocks = async (stock_name, shares, price) => {
    try {
        const [result] = await connection.query(
            `SELECT share_name,shares FROM stock_transactions WHERE share_name = ? `, [stock_name]);
        if (result.length === 0) {

            const [insert_result] = await connection.query(
                'INSERT INTO stock_transactions (share_name, shares, buy_in_date, buy_in_price, sold_out_price) values (?,?,?,?,?)',
                [stock_name, shares, getDate(), price, null]);
            return insert_result
        }
        else {
            
            const preSharesString = result[0].shares;
            const preShares = parseInt(preSharesString, 10);
            console.log('111',preShares,shares)
            const [insert_result] = await connection.query(
                'UPDATE stock_transactions set shares = ? where share_name = ?',
                [shares + preShares, stock_name]);
            console.log('re',insert_result)
            return insert_result
        }

    } catch (error) {
        console.log('error when fetching shares')
    }

};
const getAllStocksList = async () => {
    const [rows] = await connection.query('SELECT ticker,round(avg(c),2) as price from daily_price group by ticker');
    return rows;
};

const getMyStocksList = async () => {
    const [rows] = await connection.query('SELECT *  from stock_transactions');
    return rows;
};

const sellStocks = async (stock_name, shares) => {
    try {
        // Fetch current shares for the stock
        console.log('debug2222',stock_name,shares)
        const [result] = await connection.query(
            `SELECT share_name, shares FROM stock_transactions WHERE share_name = ?`, [stock_name]
        );

        // Check if any stock was found
        if (result.length === 0) {
            return 'Stock not found';
        }

        // Parse current shares count
        const preSharesString = result[0].shares;
        const preShares = parseInt(preSharesString, 10);

        // Check if there are enough shares to sell
        if (preShares < shares) {
            return 'You do not have enough shares';
        }

        // Check if the exact amount of shares are being sold
        if (preShares === shares) {
            const [sellResult] = await connection.query(
                `DELETE FROM stock_transactions WHERE share_name = ?`, [stock_name]
            );
            return 'successfully selling stocks';
        } else {
            // Update shares if not selling all
            const [sellResult] = await connection.query(
                'UPDATE stock_transactions SET shares = ? WHERE share_name = ?',
                [preShares - shares, stock_name]
            );
            return 'successfully selling stocks';
        }
    } catch (error) {
        console.log('Error when fetching shares:', error);
        throw error; // Re-throw the error for higher-level handling, if needed
    }
};

export { createstock, deletestock, getAllstocks, getstockById, updatestock, getMyStocks, getStocks, addMyStocks,getAllStocksList,
    getMyStocksList,sellStocks
 }
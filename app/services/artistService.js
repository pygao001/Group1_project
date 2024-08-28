// services/artistService.js
import connection from '../config/db.js';

const getAllArtists = async () => {
    const [rows] = await connection.query('SELECT * FROM Artist');
    return rows;
};

const getArtistById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM Artist WHERE id = ?', [id]);
    return rows[0];
};

const createArtist = async (artistData) => {
    const { name, country, numberOfMembers, style } = artistData;
    const [result] = await connection.query(
        'INSERT INTO Artist (name, country, numberOfMembers, style) VALUES (?, ?, ?, ?)',
        [name, country, numberOfMembers, style]
    );
    return { id: result.insertId, ...artistData };
};

const updateArtist = async (id, artistData) => {
    const { name, country, numberOfMembers, style } = artistData;
    const [result] = await connection.query(
        'UPDATE Artist SET name = ?, country = ?, numberOfMembers = ?, style = ? WHERE id = ?',
        [name, country, numberOfMembers, style, id]
    );
    return result.affectedRows > 0 ? { id, ...artistData } : null;
};

const deleteArtist = async (id) => {
    const [result] = await connection.query('DELETE FROM Artist WHERE id = ?', [id]);
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
        `SELECT share_name,shares FROM stock_transactions  `
    );

    return result
};


const getStocks_old = async () => {
    const [result] = await connection.query(
        `SELECT ticker,c,t FROM daily_price WHERE t >= '2024-07-01' AND t <= '2024-07-31 order by t'`
    );

    return result;
};

const getStocks = async (startDate, endDate) => {
    console.log(startDate, endDate)
    const [result] = await connection.query(
        `SELECT ticker,c FROM daily_price WHERE t >= ? AND t <= ? order by t `, [startDate, endDate]
    );

    return result;
};

const addMyStocks = async (stock_name, shares, price) => {
    console.log(stock_name, shares, price)
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
            const [insert_result] = await connection.query(
                'UPDATE stock_transactions set shares = ? where share_name = ?',
                [shares + preShares, stock_name]);
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



export {getMyStocks, getStocks, addMyStocks ,getStocks_old, createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist, getMyStocks, getStocks, addMyStocks,getAllStocksList,
    getMyStocksList,sellStocks}

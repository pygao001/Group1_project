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

const getMyStocks = async () => {   
    const [result] = await connection.query(
        `SELECT share_name,shares FROM stock_transactions  `
    );

    return result
};


const getStocks1 = async (startDate,endDate) => {
    console.log(startDate,endDate)
    const [result] = await connection.query(
        `SELECT ticker,c FROM daily_price WHERE t >= ? AND t <= ? order by t `,[startDate,endDate]
    );

    return result;
};
export {createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist,getMyStocks,getStocks1}
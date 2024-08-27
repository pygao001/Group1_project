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

const getStocks = async () => {
    const [result] = await connection.query(
        `SELECT ticker,c FROM daily_price WHERE t >= '2023-01-10' AND t <= '2023-01-15 order by t'`
    );

    return result;
};

export {createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist,getStocks}
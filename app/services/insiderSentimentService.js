import finnhub from "finnhub";
import pool from "../config/db.js"; // Import connection pool from db.js

// Initialize Finnhub API client
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cr431hpr01ql234hpclgcr431hpr01ql234hpcm0";
const finnhubClient = new finnhub.DefaultApi();

export async function fetchInsiderSentiment() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS insider_sentiment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            symbol VARCHAR(10),
            year INT,
            month INT,
            \`change\` DECIMAL(15, 2),
            mspr DECIMAL(15, 5)
        );
    `;

    // Execute the table creation query
    try {
        const [result] = await pool.query(createTableQuery);
        console.log('Table created successfully or already exists:', result);
    } catch (err) {
        console.error('Error creating table:', err);
        return;
    }

    // Fetch insider sentiment data from Finnhub
    // AAPL can be modify, perhaps using something input
    finnhubClient.insiderSentiment('TSLA', '2015-01-01', '2022-03-01', async (error, data, response) => {
        if (error) {
            console.error('Error fetching data from Finnhub:', error);
            return;
        }

        // Insert each record into the database
        for (const record of data.data) {
            const query = `INSERT INTO insider_sentiment (symbol, year, month, \`change\`, mspr) VALUES (?, ?, ?, ?, ?)`;
            const values = [
                record.symbol,
                record.year,
                record.month,
                record.change,
                record.mspr
            ];

            try {
                const [insertResult] = await pool.query(query, values);
                console.log('Data inserted successfully:', insertResult);
            } catch (err) {
                console.error('Error inserting data:', err);
            }
        }

        console.log('All data inserted successfully.');
    });
}




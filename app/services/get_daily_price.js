import pool from '../config/db.js';
import axios from 'axios';

const stocks = ['TSLA','GOOG','META','AMZN','NVDA']; // 股票列表
//const stocks = ['TSLA', 'AAPL','GOOG']
const apiKey = 'Iro3Jt_eyDToQaqOPsd1zVmt5U1yMItk'; // 替换为你的 API key
const startDate = '2023-01-01';
const endDate = '2023-01-31';

export async function fetchDailyPrice() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS daily_price (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            ticker VARCHAR(10) NOT NULL,    -- 添加 ticker 列来区分不同股票
            v BIGINT NOT NULL,
            vw FLOAT NOT NULL,
            o FLOAT NOT NULL,
            c FLOAT NOT NULL,
            h FLOAT NOT NULL,
            l FLOAT NOT NULL,
            t DATE NOT NULL,
            n BIGINT NOT NULL
        );
    `;

    // 执行建表语句
    try {
        const [result] = await pool.query(createTableQuery);
        console.log('Table created successfully or already exists:', result);
    } catch (err) {
        console.error('Error creating table:', err);
        return;
    }

    // 循环遍历每个股票
    for (const stock of stocks) {
        const url = `https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;
        
        try {
            const response = await axios.get(url);
            const results = response.data.results; // 修正：从 response.data 获取结果

            if (!results) {
                console.error(`No results found for ${stock}.`);
                continue;
            }

            // 插入数据到数据库
            for (const record of results) {
                // 将时间戳转换为日期格式
                const timestamp = record.t;
                const date = new Date(timestamp);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

                const query = `INSERT INTO daily_price (ticker, v, vw, o, c, h, l, t, n) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [
                    stock, // 插入股票符号
                    record.v,
                    record.vw,
                    record.o,
                    record.c,
                    record.h,
                    record.l,
                    formattedDate, // 使用转换后的日期
                    record.n
                ];

                try {
                    const [insertResult] = await pool.query(query, values);
                    console.log(`Data inserted successfully for ${stock}:`, insertResult);
                } catch (err) {
                    console.error(`Error inserting data for ${stock}:`, err);
                }
            }

            console.log(`All data inserted successfully for ${stock}.`);
        } catch (error) {
            // 处理 axios 请求错误
            console.error(`There was a problem with the axios request for ${stock}:`, error);
        }
    }
}

fetchDailyPrice();

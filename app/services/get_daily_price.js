import pool from '../config/db.js';
import axios from 'axios';

const url = 'https://api.polygon.io/v2/aggs/ticker/TSLA/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=Iro3Jt_eyDToQaqOPsd1zVmt5U1yMItk';

export async function fetchDailyPrice() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS daily_price (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            v BIGINT NOT NULL,
            vw FLOAT NOT NULL,
            o FLOAT NOT NULL,
            c FLOAT NOT NULL,
            h FLOAT NOT NULL,
            l FLOAT NOT NULL,
            t DATE NOT NULL,                 -- 改为 DATE 类型
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

    // 从API获取数据
    try {
        const response = await axios.get(url);
        const results = response.data.results; // 修正：从 response.data 获取结果

        if (!results) {
            console.error('No results found in the response.');
            return;
        }

        // 插入数据到数据库
        for (const record of results) {
            // 将时间戳转换为日期格式
            const timestamp = record.t;
            const date = new Date(timestamp);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            const query = `INSERT INTO daily_price (v, vw, o, c, h, l, t, n) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
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
                console.log('Data inserted successfully:', insertResult);
            } catch (err) {
                console.error('Error inserting data:', err);
            }
        }

        console.log('All data inserted successfully.');
    } catch (error) {
        // 处理 axios 请求错误
        console.error('There was a problem with the axios request:', error);
    }
}

fetchDailyPrice();

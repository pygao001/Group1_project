// app.js
//import { fetchInsiderSentiment } from './services/insiderSentimentService.js';
//import { fetchDailyPrice } from './services/get_daily_price.js';
import express from 'express';
import cors from 'cors'

import artistRoutes from './routes/artistRoutes.js'
<<<<<<< HEAD
// import portfolioRoutes from './routes/PortfolioRoutes.js'
=======
>>>>>>> e3e6d166ac7f548a987925b1019c38f8eac7dfad

const app = express();
app.use(cors({
    origin: '*', // 允许所有来源
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true // 如果你需要发送凭据（如 Cookies），设置为 true
})); // 使用 cors 中间件

app.use(express.json()); // More modern approach than using the body-parser library. it is now not required.

app.use('/artists', artistRoutes);

// await fetchDailyPrice().catch(err => console.error('Error running fetchInsiderSentiment function:', err));
// await fetchInsiderSentiment().catch(err => console.error('Error running fetchInsiderSentiment function:', err));

app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
});

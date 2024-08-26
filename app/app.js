// app.js
import { fetchInsiderSentiment } from './services/insiderSentimentService.js';
import express from 'express';
import artistRoutes from './routes/artistRoutes.js'

const app = express();
app.use(express.json()); // More modern approach than using the body-parser library. it is now not required.

app.use('/artists', artistRoutes);
fetchInsiderSentiment().catch(err => console.error('Error running fetchInsiderSentiment function:', err));
app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (_, res) => {
    res.send('Hello, this is the root path!');
});

// Your other route handlers go here

app.get('/getQuotes', async (_, res) => {
    try {
        const apiUrl = 'https://zenquotes.io/api/quotes';
        const response = await axios.get(apiUrl);
        const newData = response.data;
        res.json(newData);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

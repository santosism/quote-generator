// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://zen4you.netlify.app',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get('/getQuotes', async (_, res) => {
    try {
        const apiUrl = 'http://localhost:3000/getQuotes'; // Use your local server
        const response = await axios.get(apiUrl);
        const newData = response.data;
        res.json(newData);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

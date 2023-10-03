const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/getDistance', async (req, res) => {
    const { address1, address2 } = req.query;
    const apiKey = process.env.MAPS_API_KEY;
    console.log(apiKey);
    const endpoint = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(address1)}&destinations=${encodeURIComponent(address2)}&key=${apiKey}`;

    try {
        const response = await axios.get(endpoint);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
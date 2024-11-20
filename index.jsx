require('dotenv').config();
const axios = require('axios');

const unsplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});

unsplashApi.get('/photos/random')
    .then((response) => {
    console.log('Random Photo:', response.data);
    })
    .catch((error) => {
    console.error('Error:', error.message);
    });

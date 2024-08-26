const url = 'https://api.polygon.io/v2/aggs/ticker/TSLA/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=Iro3Jt_eyDToQaqOPsd1zVmt5U1yMItk'

import  axios from 'axios';

// Fetch the data from the URL
axios.get(url)
    .then(response => {
        // Handle the JSON data
        console.log('Data received:', response.data);
    })
    .catch(error => {
        // Handle any errors
        console.error('There was a problem with the axios request:', error);
    });



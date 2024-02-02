const express = require('express');
const path = require('path');
const https = require('https');

const app = express();

//Grab static files from the public folder to serve
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
          res.setHeader('Content-Type', 'application/javascript');
        }
    }
})); 

//Route to handle GET request to API
app.get('/api/:queryParams', (req, res) => {
    const apiUrl = `https://npiregistry.cms.hhs.gov/api/?version=2.1${req.params.queryParams}`;
    //Make a GET request to the API using the http module
    https.get(apiUrl, (apiResponse) => {
        let data = '';
    // Concatenate data chunks as they are received
    apiResponse.on('data', (chunk) => {
        data += chunk;
      });
      // Send the concatenated data back to the client when the request is complete
      apiResponse.on('end', () => {
        try {
          // Parse the received data as JSON and send it back to the client
          const jsonData = JSON.parse(data);
          res.json(jsonData);
        } catch (error) {
          console.error('Error parsing API response:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    }).on('error', (error) => {
      console.error('Error making API request:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  });

//Starts server
app.listen(3000);
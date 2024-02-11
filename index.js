const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const indexHtml = fs.readFileSync(__dirname + '/public/index.html', 'utf8');

// Define a route to serve your HTML file
app.get('/updateLocation', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/user', (req, res) => {
    let user = { id: 101, email: "manoj.dewangan@tray.com" };
    res.json(user);
});

// Set the 'public' folder as a static directory
app.use(express.static('public'));
// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
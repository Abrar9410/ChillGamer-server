require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Get
app.get('/', (req, res) => {
    res.send('Chill Gamer server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
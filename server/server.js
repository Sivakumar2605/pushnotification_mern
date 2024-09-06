const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const notificationRoutes = require('./routes/firebaseroutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;


app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
};

app.use(cors(corsOptions));

app.use('/api', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


mongoose.connect(process.env.Mongo_url)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    });

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
const port = 4000;

//MongoDB connection URL
const { MongoClient } = require('mongodb');

mongoose.connect('mongodb://localhost:27017/organicStore')
    .then(() => {
        console.log('successfully connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);//Exit the application if unable to connect to MongoDB
    });

// set view engine  and staic folder
app.set('view engine', 'ejs');
app.use(express.static('public'));


// import routes
const adminRoutes = require('./route/adminRoutes');
const userRoutes = require('./route/userRoutes');

// use routes 
app.use('/admin', adminRoutes);
app.use('/', userRoutes);


app.set('/admin/admin-product', async (res) => {
    try {
        const db = client.db('organicStore');
        const products = await db.collection('products').find().toArray();
        res.render('/admin/admin-product', { products });
    }
    catch (err) {
        console.error('Error retrieving user details', err);
        res.statusCode(500).send('Error retrieving user details');
    }
});










app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
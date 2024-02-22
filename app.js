const express = require('express');
const ejs = require('ejs');

const app = express();
const port = 8000;

//MongoDB connection URL
const { MongoClient } = require('mongodb');

// mongoose.connect('mongodb://localhost:27017/organicStore')
//     .then(() => {
//         console.log('successfully connected to MongoDB');
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1);//Exit the application if unable to connect to MongoDB
//     });

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// set view engine  and staic folder
app.set('view engine', 'ejs');
app.use(express.static('public'));


// import routes
const adminRoutes = require('./route/adminRoutes');
const userRoutes = require('./route/userRoutes');

// use routes 
app.use('/admin', adminRoutes);
app.use('/', userRoutes);


app.get('/admin/admin-product', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const pro = await collection.find().toArray();
        res.render('admin/admin-product', { pro });
    } finally {
        await client.close();
    }
});



app.get('/admin/admin-customer', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('user');

        const cus = await collection.find().toArray();
        res.render('admin/admin-customer', { cus });
    } finally {
        await client.close();
    }
});




app.get('/admin/admin-order', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('orders');

        const ord = await collection.find().toArray();
        res.render('admin/admin-order', { ord });
    } finally {
        await client.close();
    }
});



app.get('/admin/admin-category', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('category');

        const cate = await collection.find().toArray();
        res.render('admin/admin-category', { cate });
    } finally {
        await client.close();
    }
});

app.get('/home', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const pro = await collection.find().toArray();
        res.render('user/index', { pro });
    }
    finally {
        await client.close();
    }
});





app.post('/add-product', async (req, res) => {
    try {
        const { pro, cat, pri, dispri, qua, img, dis, revi } = req.body;

        const db = client.db('organicStore');
        const collection = db.collection('products');

        const result = await collection.insertOne({ productName: pro, image: img, category: cat, price: pri, discountAmount: dispri, review: revi, discription: dis, quantity: qua });
        console.log('Success',result);
        res.status(201).send("product added succesfuly");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error in adding product");
    }


});








app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
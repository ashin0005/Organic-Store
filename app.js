const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');

// -----------------------------------------------------



const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // assuming your images are in the 'public' folder

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

app.get('/Everything', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const every = await collection.find().toArray();
        res.render('user/Everything', { every });
    }
    finally {
        await client.close();
    }
});
app.get('/Everything2', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const every2 = await collection.find().toArray();
        res.render('user/Everything2', { every2 });
    }
    finally {
        await client.close();
    }
});
app.get('/Groceries', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const grocery = await collection.find().toArray();
        res.render('user/Groceries', { grocery });
    }
    finally {
        await client.close();
    }
});
app.get('/Groceries2', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const grocery2 = await collection.find().toArray();
        res.render('user/Groceries2', { grocery2 });
    }
    finally {
        await client.close();
    }
});
app.get('/Juice', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const juice = await collection.find().toArray();
        res.render('user/Juice', { juice });
    }
    finally {
        await client.close();
    }
});




// Set up multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/admin/images/products'); // Specify the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
    }
});

const upload = multer({ storage: storage });

app.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const { productName, category, price, discountAmount, review, description, quantity } = req.body;
        const image = req.file.filename; // multer adds the 'file' property to req
        // const images = req.file ? req.file.filename : null; // Check if a file was uploaded
        console.log(productName, image, category, price, discountAmount, review, description, quantity);

        const myobj = { productName, image, category, price, discountAmount, review, description, quantity };
        await collection.insertOne(myobj);

        console.log("1 document inserted");
        res.redirect('/admin/admin-addproduct'); // Redirect after successfull insertion
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
});










app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
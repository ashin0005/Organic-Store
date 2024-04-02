const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');
// -----------------------------------------------------



const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // assuming your images are in the 'public' folder

//MongoDB connection URL
const { MongoClient, Collection } = require('mongodb');

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
const { register } = require('module');

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
app.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const pro = await collection.find().toArray();
        res.render('user/demo', { pro });
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
app.get('/productPage', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('products');

        const prdPage = await collection.find().toArray();
        res.render('user/productPage', { prdPage });
    }
    finally {
        await client.close();
    }
});



// Adding categories

const Categstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/admin/images/category'); // Specify the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
    }
});

const Cupload = multer({
    storage: Categstorage,
    fileField: 'image' // Specify the field name for the uploaded file
});

app.post('/addcate', Cupload.single('image'), async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('category');

        const { categname, categimg } = req.body;
        const image = req.file.filename; // multer adds the 'file' property to req
        // const images = req.file ? req.file.filename : null; // Check if a file was uploaded
        console.log(categname, categimg);

        const myobj = { categname, categimg };
        await collection.insertOne(myobj);

        console.log("1 document inserted");
        res.redirect('/admin/admin-category'); // Redirect after successfull insertion
    } catch (err) {
        console.error("Error:", err);
    } finally {
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



// <------------ user- register ------------>



app.post('/registration', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('user');

        const { FirstName, LastName, age, number, email, password } = req.body;

        console.log(FirstName, LastName, age, number, email, password);

        const myDetails = { FirstName, LastName, age, number, email, password };
        await collection.insertOne(myDetails);

        console.log("1 document inserted");
        res.redirect('/login'); // Redirect after successfull insertion
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
});



// <------- user-Login-------->



app.post('/login', async (req, res) => {
    const { Uemail, Upassword } = req.body;
    console.log('Input email:', Uemail);
    console.log('Input password:', Upassword);


    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('user');

        const user = await collection.findOne({ email: Uemail }); // Changed 'email' to 'Uemail'
        console.log('User found:', user);

        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log('Stored password:', user.password);

        if (Upassword !== user.password) {
            return res.redirect('/login');
        } else {
            return res.redirect('/home');
        }



    } catch (error) {
        res.status(500).send('Error logging in');
    }
});



//Display profile name after user login 
app.get('/navbar', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('user');

        const Uname = await collection.find().toArray();
        res.render('user/home', { Uname });
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
});




// <------------ admin- register ------------>



app.post('/admin/admin-register', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('admin');

        const { ADFirstName, ADLastName, ADage, ADnumber, ADemail, ADpassword } = req.body;

        const myDetails = { ADFirstName, ADLastName, ADage, ADnumber, ADemail, ADpassword };

        await collection.insertOne(myDetails);

        console.log("1 document inserted");
        res.redirect('/admin/admin-login'); // Redirect after successfull insertion
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
});



// <------- admin-Login-------->



app.post('/admin/admin-login', async (req, res) => {
    const { ADemail, ADpassword } = req.body;
    console.log('Input email:', ADemail);
    console.log('Input password:', ADpassword);


    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('admin');

        const admin = await collection.findOne({ ADemail: ADemail }); // Changed 'email' to 'ADemail'
        console.log('User found:', admin);

        if (!admin) {
            return res.status(404).send('User not found');
        }

        console.log('Stored password:', admin.ADpassword);

        if (ADpassword !== admin.ADpassword) {
            return res.redirect('/admin/admin-login');
        } else {
            return res.redirect('/admin/admin-dashboard');
        }



    } catch (error) {
        res.status(500).send('Error logging in');
    }
});




// cart -------------------------->


app.post('/addToCart', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('cart');

        const { prdCate, prdName, prdPrice } = req.body;

        // console.log(addCart);

        const myCart = { prdCate, prdName, prdPrice };
        await collection.insertOne(myCart);

        console.log("1 document inserted");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
});



// display cart

app.get('/cart', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('organicStore');
        const collection = db.collection('cart');

        const cartItems = await collection.find().toArray();
        res.render('user/cart', { cartItems });
    }
    finally {
        await client.close();
    }
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('user/login');
});
// router.get('/home', (req, res) => {
//     res.render('user/index');
// });
router.get('/about', (req, res) => {
    res.render('user/about');
});
router.get('/contact', (req, res) => {
    res.render('user/contact');
});
router.get('/Juice', (req, res) => {
    res.render('user/Juice');
});
router.get('/Groceries', (req, res) => {
    res.render('user/Groceries');
});
router.get('/Everything', (req, res) => {
    res.render('user/Everything');
});
router.get('/Everything2', (req, res) => {
    res.render('user/Everything2');
});
router.get('/Groceries2', (req, res) => {
    res.render('user/Groceries2');
});
router.get('/cart', (req, res) => {
    res.render('user/cart');
});
router.get('/productPage', (req, res) => {
    res.render('user/productPage');
});
router.get('/registration', (req, res) => {
    res.render('user/registration');
});
// router.get('/login', (req, res) => {
//     res.render('user/login');
// });


module.exports = router;

const express = require('express');
const { fstat } = require('fs');
const router = express.Router();



router.get('/admin-dashboard', (req, res) => {
    res.render('admin/admin-dashboard');
});
// router.get('/admin-category', (req, res) => {
//     res.render('admin/admin-category');
// });
// router.get('/admin-product', (req, res) => {
//     res.render('admin/admin-product');
// });
// router.get('/admin-addproduct', (req, res) => {
//     res.render('admin/admin-addproduct');
// });
// router.get('/admin-order', (req, res) => {
//     res.render('admin/admin-order');
// });
// router.get('/admin-customer', (req, res) => {
//     res.render('admin/admin-customer');
// });
router.get('/admin-marketing', (req, res) => {
    res.render('admin/admin-marketing');
});
router.get('/admin-notify', (req, res) => {
    res.render('admin/admin-notify');
});
router.get('/admin-register', (req, res) => {
    res.render('admin/admin-register');
});
router.get('/admin-login', (req, res) => {
    res.render('admin/admin-login');
});
// router.get('/admin-editProduct', (req, res) => {
//     res.render('admin/admin-editProduct');
// });



module.exports = router;
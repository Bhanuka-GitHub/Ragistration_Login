const router = require('express').Router();

const { userRegister, userLogin } = require('../utils/Auth'); 
/*
Registration routes
*/
//customer Registration route
router.post('/register-customer', async (req, res) => {
    await userRegister(req.body, "customer", res); 
})

//Admin Registration route
router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, "admin", res);   
})

//Artist Registration route
router.post('/register-artist', async (req, res) => {
    await userRegister(req.body, "artist", res);
})
/*
Login routes
*/
//can make 3 users to one login api
//Customer Login route
router.post('/login-customer', async (req, res) => {
    await userLogin(req.body, res,'customer');
})

//Admin Login route
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, res);
})

//Artist Login route
router.post('/login-artist', async (req, res) => {
    await userLogin(req.body, res);
 })

//Common profile route
router.get('/profile',async(req,res)=>{ })

//Customer Protected route
router.post('/customer-protected',async(req,res)=>{})

//Admin Protected route
router.post('/admin-protected',async(req,res)=>{})

//Artist Protected route
router.post('/artist-protected/;f',async(req,res)=>{})




module.exports = router;
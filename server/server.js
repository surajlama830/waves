const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
// mongoose.connect('mongodb://localhost/27017/waves');
console.log(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


// Routes
const userRoutes = require('./routes/User/user');
const brandRoutes = require('./routes/product/brand');
const woodRoutes = require('./routes/product/wood');
const productRoutes = require('./routes/product/product');

app.use(express.static('client/public/uploads'));
// CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content_Type, Accept, Authorization");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE,GET');
//         return res.status(200).json({});
//     }
//     next();
// });
// ============================
//        Products
// ============================
app.use('/api/product', productRoutes)
// ============================ 
//        Woods
// ============================
app.use('/api/product', woodRoutes)

// ============================
//        Brands
// ============================
app.use('/api/product', brandRoutes);


// ============================
//        USERS
// ============================
app.use('/api/users', userRoutes);


const port = process.env.PORT || 3002;

app.listen(port,()=>(
    console.log(`Server Running at port ${port}`)
))
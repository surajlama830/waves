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

const spareStringRoutes = require('./routes/product/accessories/spareStrings');
const guitarTunerRoutes = require('./routes/product/accessories/guitarTuner');
const guitarCableRoutes = require('./routes/product/accessories/guitarCable');
const guitarCapoRoutes = require('./routes/product/accessories/guitarCapo');
const guitarStrapRoutes = require('./routes/product/accessories/guitarStrap');
const guitarBagRoutes = require('./routes/product/accessories/guitarBags');
const guitarPicksRoutes = require('./routes/product/accessories/guitarPicks');
const guitarStandRoutes = require('./routes/product/accessories/guitarStand');



app.use(express.static('public'));
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
// =============================
// accessories
app.use('/api/acessories/strings', spareStringRoutes )
app.use('/api/acessories/guitarCable', guitarCableRoutes )
app.use('/api/acessories/guitarCapo', guitarCapoRoutes )
app.use('/api/acessories/guitarStrap', guitarStrapRoutes )
app.use('/api/acessories/guitarBag', guitarBagRoutes )
app.use('/api/acessories/guitarPick', guitarPicksRoutes )
app.use('/api/acessories/guitarStand', guitarStandRoutes )
app.use('/api/acessories/guitarTuner', guitarTunerRoutes )
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
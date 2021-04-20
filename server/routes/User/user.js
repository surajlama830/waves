const express = require('express');
const router = express.Router();

const userController = require('../../controller/user/UserController');
// middlewares
const { auth } = require('../../middleware/Auth');

const multer = require('multer');
const { admin } = require('../../middleware/Admin');
const fs = require('fs');

// for payment
const path = require('path');
const stripe = require('stripe')(
	'sk_test_51Ih9kyLsmbl91PPaFKnRxT3W05usspoNQdG6VfMwyvf5kESiTMx3oaqIuq1WqyRblk0WeQmrVz6YKrRCN2sz12FD00KZM3lbVZ'
);

const mailer = require('nodemailer');


const { v4: uuidv4 } = require('uuid');
const { Payment } = require('../../models/Payment');
const { User } = require('../../models/User');
const async =  require('async');
const { Product } = require('../../models/Product');
const { GuitarBags } = require('../../models/accessories/guitarBags');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './client/public/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, '')}`);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(() => res.staus(400).json({ message: 'Only jpg, png is allowed' }), false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
}).single('file');

router.post('/uploadfile', auth, admin, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		} else {
			console.log(res.req.file);
			return res.json({
				success: true,
				file: res.req.file,
				url: res.req.file.filename
			});
		}
	});
});
router.get('/admin_files', auth, admin, (req, res) => {
	const dir = path.resolve('.') + '/client/public/uploads/';
	fs.readdir(dir, (err, items) => {
		return res.status(200).send(items);
	});
});
router.get('/remove_image', auth, admin, (req, res) => {
	let image_name = req.query.filename;
	const pathname = path.resolve('.') + `/client/public/uploads/${image_name}`;
	fs.unlink(pathname, (err) => {
		if (err) {
			return res.json({ success: false, err });
		} else {
			return res.json({ success: true, message: 'image removed' });
		}
	});
});

router.post('/register', userController.resigterUser);
router.post('/update_profile', auth, userController.updateProfile);

router.get('/auth', auth, userController.userAuthentication);

router.post('/login', userController.loginUser);

router.get('/logout', auth, userController.logoutUser);

router.post('/addToCart', auth, userController.addToCart);

router.get('/removeFromCart', auth, userController.removeFromCart);
router.post('/checkout', auth, async (req, res) => {
	// console.log("Request :", req.body);
	let error;
	let status;
	let chargeData;
	try {
		const { product, token, price } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		});
		const idempotencyKey = uuidv4();
		const charge = await stripe.charges.create(
			{
				amount: price * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the  PRODUCT NAME`,
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip
					}
				}
			},
			{
				idempotencyKey
			}
		);
		// console.log("charge : ", {charge});
		status = 'success';
		chargeData = charge;
	} catch (err) {
		console.log('Error : ', { err });
		status = 'failure';
	}
	res.json({ error, status, chargeData });
});

router.post('/successBuy', auth, (req, res) => {
	let history = [];
	let transactionData = {};
	let Usercarts = [];
	// let cartsss = []
	for (let key in req.body.cartDetail) {
		Usercarts.push(req.body.cartDetail[key]);
	}

	Usercarts.forEach((item) => {
        if (item.productName === 'guitarBag' && item.Cart !==null) {

			item.Cart.forEach((itemCart) => {
				history.push({
					dateOfPurchase: Date.now(),
					brand: itemCart.brand,
					name: itemCart.name,
					productType: 'guitarBag',
					id: itemCart._id,
					price: itemCart.price,
					quantity: itemCart.quantity,
					paymentId: req.body.paymentData.id
				});
			});
		} else if(item.productName === 'guitar' && item.Cart !== null) {

			item.Cart.forEach((itemCart) => {
				history.push({
					dateOfPurchase: Date.now(),
					brand: itemCart.brand,
					name: itemCart.name,
					productType: 'guitar',
					id: itemCart._id,
					price: itemCart.price,
					quantity: itemCart.quantity,
					paymentId: req.body.paymentData.id
				});
			});
		}
	});

	// payments dash
	transactionData.user = {
		id: req.user._id,
		name: req.user.name,
		lastname: req.user.lastname,
		email: req.user.email
	};
	transactionData.data = req.body.paymentData;
	transactionData.product = history;
    // console.log("called before update")
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { history: history }, $set: { cart: [] } },
		{ new: true },
		(err, user) => {
			if (err) return res.json({ success: false, err });
            // console.log("update")
			const payment = new Payment(transactionData);
			payment.save((err, doc) => {
				if (err) return res.json({ success: false, err });
				let products = [];
                console.log(doc)
				doc.product.forEach((item) => {
					products.push({
						id: item.id,
						quantity: item.quantity,
                        productType:item.productType
					});
				});
				async.eachSeries(
					products,
					(item, callback) => {
                        // console.log('item', item)
                        // console.log('products', products)
						// update
                        if(item.productType === 'guitar'){
                            console.log("guitar called")
                            Product.findOneAndUpdate(
                                { _id: item.id },
                                {
                                    $inc: {
                                        sold: item.quantity,
                                        stock: - item.quantity
                                    }
                                },
                                { new: false },
                                callback
                            );
                        }
                        else if(item.productType === 'guitarBag'){
                            // console.log("guitar called")
                            GuitarBags.findOneAndUpdate(
                                { _id: item.id },
                                {
                                    $inc: {
                                        sold: item.quantity,
                                        stock: - item.quantity
                                    }
                                },
                                { new: false },
                                callback
                            );
                        }
					},
					(err) => {
                        // console.log("called")
						if (err) return res.json({ success: false, err });
						res.status(200).json({
							success: true,
							cart: user.cart,
							cartDetail: []
						});
					}
				);
			});
		}
	);
});
router.post('/sendmail', auth, (req,res)=>{
	console.log(req.body)
	const smtpTransport = mailer.createTransport({
		service:"Gmail",
		auth:{
			user:"lsuraj380@gmail.com",
			pass:"sur@jbomj@n!123"
		}
	});
	var mail ={
		from:"Waves <lsuraj380@gmail.com>",
		to:"surajlama830@gmail.com",
		subject:"send test email",
		text:"Testing our Waves mails",
		html:"<b>Hello gur this Works!!</b>"
	}
	smtpTransport.sendMail(mail,function(err, res){
		if(err){
			console.log(err)
		}
		else{
			console.log("emamil sent")
		}
		smtpTransport.close()
	})
})
module.exports = router;

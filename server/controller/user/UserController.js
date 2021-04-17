const { User } = require('../../models/User');
const mongoose = require('mongoose');
const { Product } = require('../../models/Product');
const { GuitarBags } = require('../../models/accessories/guitarBags');

exports.resigterUser = (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		res.status(200).json({
			success: true,
			userdata: doc
		});
	});
};

exports.userAuthentication = (req, res) => {
	res.status(200).json({
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		cart: req.user.cart,
		history: req.user.history
	});
};

exports.loginUser = (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) return res.json({ loginSuccess: false, message: 'Auth Failed, Email not found!' });

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: 'Worng Passowrd' });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie('w_auth', user.token).status(200).json({
					loginSuccess: true
				});
			});
		});
	});
};

exports.logoutUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({
			success: true
		});
	});
};

exports.addToCart = (req, res) => {
	User.findOne({ _id: req.user._id }, (err, doc) => {
		let duplicate = false;

		doc.cart.forEach((item) => {
			if (item.id.toHexString() === req.query.productId) {
				duplicate = true;
			}
		});
		if (duplicate) {
			User.findOneAndUpdate(
				{ _id: req.user._id, 'cart.id': mongoose.Types.ObjectId(req.query.productId) },
				{ $inc: { 'cart.$.quantity': 1 } },
				{ new: true },
				(err, doc) => {
					if (err) return res.json({ success: false, err });
					console.log(duplicate);
					res.status(200).json(doc.cart);
				}
			);
		} else {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: {
						cart: {
							id: mongoose.Types.ObjectId(req.query.productId),
							type: req.body.productType,
							quantity: 1,
							date: Date.now()
						}
					}
				},
				{ new: true },
				(err, doc) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json(doc.cart);
				}
			);
		}
	});
};

exports.removeFromCart = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$pull: {
				cart: { id: mongoose.Types.ObjectId(req.query._id) }
			}
		},
		{ new: true },
		(err, doc) => {
			let cart = doc.cart;
			let array = cart.map((item) => {
				return mongoose.Types.ObjectId(item.id);
			});
			if (req.query.type == 'Guitar') {
				Product.find({ _id: { $in: array } })
					.populate('brand')
					.populate('wood')
					.exec((err, cartGuitarDetail) => {
						// console.log('Cartdetail',cartDetail)
						GuitarBags.find({ _id: { $in: array } }).populate('brand').exec((err, cartDetail) => {
							console.log('Cartdetail', cartDetail);
							return res.status(200).json({
								cartDetail: [
									{ productName: 'guitarBag', Cart: cartDetail },
									{ productName: 'guitar', Cart: cartGuitarDetail }
								],
								cart
							});
						});
					});
			}
		}
	);
};

exports.updateProfile = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$set: req.body
		},
		{ new: true },
		(err, doc) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).send({
				success: true
			});
		}
	);
};

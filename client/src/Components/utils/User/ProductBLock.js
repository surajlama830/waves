import React from 'react';

const ProductBLock = ({ products, removeItem }) => {
	console.log(products.cartDetail);
	const renderCardImage = (images) => {
		if (images.length > 0) {
			return images[0].filename;
		} else {
			return 'image_not_availble.png';
		}
	};
	const renderItems = () =>
		products.cartDetail
			? products.cartDetail.map((items, i) => {
					// console.log(items.Cart);
					if (items.Cart !== null) {
						return items.Cart.map((product) => (
							<div className="user_product_block" key={product._id}>
								<div className="item">
									<div
										className="image"
										style={{
											background: `url(${process.env.PUBLIC_URL}/uploads/${renderCardImage(
												product.images
											)}) no-repeat`
										}}
									/>
								</div>
								<div className="item">
									<h4>Product name :</h4>
									<div>
										{product.brand.name} {product.name}
									</div>
								</div>
								<div className="item">
									<h4>Quantity : </h4>
									<div>{product.quantity}</div>
								</div>
								<div className="item">
									<h4>Price : </h4>
									<div>$ {product.price}</div>
								</div>
								<div className="item btn">
									<div className="cart_remove_btn" onClick={() => removeItem(product._id, 'Guitar')}>
										Remove
									</div>
								</div>
							</div>
						));
					}
				})
			: null;

	return <div>{renderItems()}</div>;
};

export default ProductBLock;

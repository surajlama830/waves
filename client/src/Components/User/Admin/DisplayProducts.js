import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

const DisplayProducts = ({productType, products,editProudcts, history,title }) => {
	console.log(products)
	const renderCardImage = (images) => {
		if (images.length > 0) {
			return images[0].filename;
		} else {
			return 'image_not_availble.png';
		}
	};
	const viewProduct =(id)=>{
		if(productType==='guitar'){
			history.push(`/product_detail/${id}/Guitar`)
		}
		else if(productType==='guitarBag'){
			history.push(`/product_detail/${id}/guitarBag`)
		}
	}
	const renderItems = () => {
		const items = products
			? products.map((product) => (
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
							<div style={{textAlign:'center'}}>
								{product.name}
							</div>
						</div>
						<div className="item">
							<div style={{textAlign:'center'}}>{product.stock}</div>
						</div>
						<div className="item">
							<div style={{textAlign:'center'}}>$ {product.price}</div>
						</div>
						<div className="item btn" style={{textAlign:'center'}}>
                        <FontAwesomeIcon
                                    icon={ faPen  }
                                    className="icon"
									color='green'
                                    onClick= {()=>editProudcts(product._id)}
                                />
                                &nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                                    icon={ faEye }
                                    className="icon"
                                    color='blue'
									onClick={()=>viewProduct(product._id)}
                                />
								&nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                                    icon={ faTrash }
                                    className="icon"
                                    color='red'
                                />

						</div>
					</div>
				))
			: null;
		return items;
	};
	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>List of {title}</h2>
			<div className="user_product_block">
				<div className="item "><p className="text-capitalize" style={{textAlign:'center'}}>image</p></div>
				<div className="item "><p className="text-capitalize" style={{textAlign:'center'}}>Product name</p></div>
				<div className="item "><p className="text-capitalize" style={{textAlign:'center'}}>In stock</p></div>
				<div className="item "><p className="text-capitalize" style={{textAlign:'center'}}>Price</p></div>
				<div className="item "><p className="text-capitalize" style={{textAlign:'center'}}>Action</p></div>
			</div>
				{renderItems()}
		</div>
	);
};

export default withRouter(DisplayProducts);

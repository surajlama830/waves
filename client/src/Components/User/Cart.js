import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import UserLayout from '../../HOC/UserLayout';
import { getCartItems, removeFromCart } from '../../store/actions/user_action';
import ProductBLock from '../utils/User/ProductBLock';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';

class Cart extends Component {
	state = {
		loading: true,
		total: 0,
		showSuccess: false,
		showTotal: false
	};
	componentDidMount() {
		let cartItems = [];
		let user = this.props.user;
		console.log(user);
		if (user.userData.cart) {
			if (user.userData.cart.length > 0) {
				user.userData.cart.forEach((item) => {
					cartItems.push({ id: item.id, type: item.type });
				});
				this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(() => {
					if (this.props.user.cartDetail) {
						this.calculateTotalPrice(this.props.user.cartDetail);
					}
				});
			}
		}
	}
	calculateTotalPrice = (cartDetail) => {
		let total = 0;
		let carts = [];
		for (let key in cartDetail) {
				carts.push(cartDetail[key]);
		}
		carts.forEach((item) => {
 
                if(item.Cart !==null && item.Cart !==undefined){
					item.Cart.forEach(pr=>{
						total += parseInt(pr.price) * pr.quantity;
					})
				}
		});
		this.setState({
			total,
			showTotal: true
		});
	};
	removeItem = (id, type) =>
		this.props.dispatch(removeFromCart(id, type)).then(() => {
			if (this.props.user.cartDetail === null) {
				this.setState({
					showTotal: false
				});
			} else {
				this.calculateTotalPrice(this.props.user.cartDetail);
			}
		});
	showNoItemMessage() {
		return (
			<div className="cart_no_items">
				<FontAwesomeIcon icon={faFrown} />
				<h3>You have no items in cart...</h3>
			</div>
		);
	}
	render() {
		return (
			<UserLayout>
				<div>
					<h1>My cart</h1>
					<div className="user_cart">
						<ProductBLock
							products={this.props.user}
							type="cart"
							removeItem={(id, type) => this.removeItem(id, type)}
						/>
						{this.state.showTotal ? (
							<div>
								<div className="user_cart_sum">
									<div>Total amount: $ {this.state.total}</div>
								</div>
							</div>
						) : this.state.showSuccess ? (
							<div className="cart_success">
								<div>
									<FontAwesomeIcon icon={faSmile} />
								</div>
								<div>Thank You</div>
								<div>Your Order Is Now Complete</div>
							</div>
						) : (
							this.showNoItemMessage()
						)}
					</div>
					{this.state.showTotal ? <div className="paypal_button_container">Paypal</div> : null}
				</div>
			</UserLayout>
		);
	}
}
const maptStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(maptStateToProps)(Cart);

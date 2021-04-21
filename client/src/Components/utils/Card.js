import React, { Component } from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user_action';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router-dom';
class Card extends Component {
	state = {
		openDialog: false
	};
	renderCardImage = (images) => {
		if (images.length > 0) {
			return images[0].filename;
		} else {
			return '/image_not_availble.png';
		}
	};
	redirectToRegister() {
		this.setState({
			openDialog: true
		});
		const rdirect = setTimeout(() => {
			this.props.history.push('/register_login');
		}, 3000);
		return rdirect;
	}
	render() {
		const props = this.props;
		// console.log(props)
		return (
			<div className={`mb-4 ${props.grid ? 'col-12' : `col-sm-6 ${props.responsiveColumn}`}`}>
				<div className={`card_item_wrapper ${props.grid && 'd-flex'}`}>
					<div
						className={`image ${props.grid && 'flex__1'}`}
						style={{
							background: `url(${process.env.PUBLIC_URL}/uploads/${this.renderCardImage(
								props.images
							)}) no-repeat`
						}}
					/>
					<div
						className={`action_container ${props.grid
							? 'flex__2'
							: 'd-flex justify-content-between align-items-end'}`}
					>
						<div className="tags">
							<div className="name">
								<Link to={`/product_detail/${props._id}/${props.typeName}`} className="product__name">
									{props.name}
								</Link>
							</div>
							<div className="brand brand__name">{props.brand && props.brand.name}</div>

							{props.grid ? (
								<div className="description">
									<p>{props.description}</p>
								</div>
							) : null}

							<div className="name price__name">$ {props.price}</div>
						</div>

						<div className="actions justify-content-between align-items-center">
							{props.grid ? 
							<div className="brand__name">
								Available : {props.stock > 0 ? "Yes": "No"}
							</div>
							:null}
							<div className="button_wrapp">
								<Button
									type="bag_link"
									runAction={() => {
										props.user.userData.isAuth
											? this.props.dispatch(addToCart(props._id, props.typeName))
											: this.redirectToRegister();
									}}
								/>
							</div>
						</div>

						<Dialog open={this.state.openDialog}>
							<div className="dialog_alert">
								<div>You are not logged in</div>
								<div>You will be redirected to the LOGIN in a couple seconds....</div>
							</div>
						</Dialog>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(withRouter(Card));

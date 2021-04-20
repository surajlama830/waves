import React, { Component } from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user_action';

import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router-dom';
class Card extends Component {
    state={
        openDialog:false
    }
	renderCardImage = (images) => {
		if (images.length > 0) {
			return images[0].filename;
		} else {
			return '/image_not_availble.png';
		}
	};
	redirectToRegister() {
        this.setState({
            openDialog:true
        })
		const rdirect = setTimeout(() => {
			this.props.history.push('/register_login');
		}, 3000);
		return rdirect;
	}
	render() {
		const props = this.props;
		// console.log(props)
		return (
			<div className={`card_item_wrapper col-lg-3 ${props.grid}`}>
				<div
					className="image"
					style={{
						background: `url(${process.env.PUBLIC_URL}/uploads/${this.renderCardImage(
							props.images
						)}) no-repeat`
					}}
				/>
				<div className="action_container">
					<div className="tags">
						<div className="brand">{props.brand.name}</div>
						<div className="name">{props.name}</div>
						<div className="name">$ {props.price}</div>
					</div>

					{props.grid ? (
						<div className="description">
							<p>{props.description}</p>
						</div>
					) : null}

					<div className="actions">
						<div className="button_wrapp">
							<Button
								type="default"
								altClass="card_link"
								title="View Product"
								linkTo={`/product_detail/${props._id}/${props.typeName}`}
								// typeName={props.typeName}
								addStyle={{
									margin: '10px 0 0 0'
								}}
							/>
						</div>
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
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(withRouter(Card));

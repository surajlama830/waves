import React, { Component } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/user_action";
import { Link } from 'react-router-dom';

class Card extends Component {
  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].filename;
    } else {
      return "/image_not_availble.png";
    }
  };
  render() {
    const props = this.props;
    return (
      <div className={`mb-4 col-sm-6 col-lg-3 ${props.grid}`}>
        <div className="card_item_wrapper">
          <div
            className="image"
            style={{
              background: `url(${
                process.env.PUBLIC_URL
              }/uploads/${this.renderCardImage(props.images)}) no-repeat`,
            }}
          />

          <div className="action_container d-flex justify-content-between align-items-end">
            <div className="tags">
              <div className="name">
                  <Link 
                    to={`/product_detail/${props._id}/${props.typeName}`}
                    className="product__name"
                >
                  {props.name}
                </Link>
              </div>
              <div className="brand brand__name">{props.brand && props.brand.name}</div>
              <div className="name price__name">$ {props.price}</div>
            </div>

             <div className="actions">
              <div className="button_wrapp">
                <Button
                  type="bag_link"
                  runAction={() => {
                    props.user.userData.isAuth
                      ? this.props.dispatch(
                          addToCart(props._id, props.typeName)
                        )
                      : console.log("you need to login");
                  }}
                />
              </div>
            </div>

            {props.grid ? (
              <div className="description">
                <p>{props.description}</p>
              </div>
            ) : null}

           
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Card);

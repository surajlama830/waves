import React, { Component } from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user_action';

class Card extends Component {
    renderCardImage =(images)=>{
        if(images.length > 0){
            return images[0].filename
        }
        else{
            return '/image_not_availble.png'
        }
    }
    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper col-lg-3 ${props.grid}`}>
                <div 
                    className="image"
                    style={{
                        background:`url(${process.env.PUBLIC_URL}/uploads/${this.renderCardImage(props.images)}) no-repeat`
                    }}
                >

                </div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{props.brand.name}</div>
                        <div className="name">{props.name}</div>
                        <div className="name">Rs. {props.price}</div>
                    </div>
                
                {
                    props.grid?
                        <div className="description">
                            <p>{props.description}</p>
                        </div>
                    :null
                }
                
                <div className="actions">
                    <div className="button_wrapp">

                        <Button
                            type="default"
                            altClass="card_link"
                            title="View Product"
                            linkTo={`/product_detail/${props._id}/${props.typeName}`}
                            // typeName={props.typeName}
                            addStyle={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="button_wrapp">
                        <Button 
                            type="bag_link"
                            runAction={()=>{
                                props.user.userData.isAuth ?
                                    this.props.dispatch(addToCart(props._id, props.typeName))
                                : console.log("you need to login")
                            }}
                        />
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Card);
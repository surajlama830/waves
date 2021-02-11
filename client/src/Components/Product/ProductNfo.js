import React from 'react';

import Button from '../utils/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTruck }  from '@fortawesome/free-solid-svg-icons';



const ProductNfo = (props) => {
    const detail = props.detail;
    
    const showProdTags=(details)=>(
        <div className="product_tags">
            {
                details.shipping ?
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTruck} className="icon" />
                    </div>
                    <div className="tag_text">
                        <div>Free Shipping</div>
                        <div>And Return</div>
                    </div>
                </div>
                :null
            }
            {
                details.available ?
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                    </div>
                    <div className="tag_text">
                        <div>Available </div>
                        <div>in Store</div>
                    </div>
                </div>
                :
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTimes} className="icon" />
                    </div>
                    <div className="tag_text">
                        <div>Not Available </div>
                        <div>Pre Order Only</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (dt)=>(
        <div className="product_actions">
            <div className="price">
               RS. {dt.price}
            </div>
            <div className="cart">
            <Button 
                type="add_to_cart_link"
                runAction={()=>{
                  props.addToCart(detail._id);
                }}
            />
            </div>
        </div>
    )

    const showProdSpecification=(dt)=>(
        <div className="product_specifications">
            <h2>Specs :</h2>
            <div>
                <div className="item">
                    <strong>Frets:</strong> {dt.frets}
                </div>
                <div className="item">
                    <strong>Wood:</strong> {dt.wood.name}
                </div>
                <div className="item">
                    <strong>Brand:</strong> {dt.brand.name}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
            <p>
                {detail.description}
            </p>
            {showProdTags(detail)}

            {showProdActions(detail)}

            {showProdSpecification(detail)}
        </div>
    );
};

export default ProductNfo;
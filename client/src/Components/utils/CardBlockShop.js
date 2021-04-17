import React from 'react';
import Card from './Card';

const CardBlockShop = (props) => {
    const renderCards = ()=>(
        props.list ? 
            props.list.map(card=>(
                <Card 
                    typeName={props.typeName}
                    key={card._id}
                    {...card}
                    grid="col-sm-6 col-lg-4"
                />
            ))
        :null
    )
    return (
        <div className="card_block_shop">
            <div>
                <div className="row">
                    {props.list ? 
                        props.list.length === 0 ?
                            <div className="no_results">
                                Sorry, No results
                            </div>
                        :null
                    :null}
                    {renderCards(props.list)}
                </div>
            </div>
            
        </div>
    );
};

export default CardBlockShop;
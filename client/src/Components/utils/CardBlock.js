import React from 'react';
import Card from './Card';

const CardBlock = (props) => {
    console.log(props)
    const renderCards = ()=>(
        props.list?
            props.list.map((card, i)=>(
                
                <Card 
                    key={i}
                    {...card}
                    responsiveColumn="col-md-3"
                    />
            ))
        :null

    )
    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ?
                    <div className="title">
                        {props.title}

                    </div>
                    :null
                }
                <div className="row">
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;
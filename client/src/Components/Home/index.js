import React, { Component } from 'react';

import HomePromotion from './Home_promotion';
import HomeSlider from './Home_slider';

import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySell } from '../../store/actions/product_action';
import CardBlock from '../utils/CardBlock';


class Home extends Component {
    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }
    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock 
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotion/>
                <CardBlock 
                    list={this.props.products.byArrival}
                    title="Best Selling Guitars"
                />
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        products:state.products
    }
}

export default connect(mapStateToProps)(Home);
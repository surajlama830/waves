import React, { Component } from 'react';

import { connect } from 'react-redux';
import { clearProductDetail, getProductDetail } from '../../store/actions/product_action';
import PageTop from '../utils/PageTop';

import { CircularProgress } from '@material-ui/core';
import ProductNfo from './ProductNfo';
import ProdImg from './ProdImg';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../store/actions/user_action';

class ProductPage extends Component {
    state={
        dataFound:faTemperatureHigh
    }
    componentDidMount(){
        const id= this.props.match.params.id;
        
        this.props.dispatch(getProductDetail(id))
        .then(res=>{
            if(!this.props.products.prodDetail){
                this.setState({
                    dataFound:false
                })
            }
        });
        
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());

    }
    addToCartHandler=(id)=>{
        this.props.dispatch(addToCart(id))
    }
    render() {
        
        return (
            <div>
                <PageTop 
                    title="Product detail"
                />
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div style={{
                                        width:'500px'
                                    }}>
                                        <ProdImg
                                            detail = {this.props.products.prodDetail}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <ProductNfo 
                                        addToCart={(id)=>this.addToCartHandler(id)}
                                        detail={this.props.products.prodDetail} 
                                    />
                                </div>
                            </div>
                        :
                        (this.state.dataFound ? <CircularProgress 
                            style={{color:'#00bcd4'}}
                            thickness={7}
                             /> : <h3 style={{textAlign:'center'}}>Product Not Found !!!..</h3>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        products:state.products
    }
}
export default connect(mapStateToProps)(ProductPage);
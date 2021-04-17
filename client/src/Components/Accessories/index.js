import React, { Component, createRef } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getProductsToShop } from '../../store/actions/product_action'; 
import { accessories } from '../utils/Form/FixedCategories';

import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreCard from '../Shop/LoadMoreCard';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTh} from '@fortawesome/free-solid-svg-icons';
import { getGuitarBag } from '../../store/actions/accessories_action/bag_action';


class Shop extends Component {
    wrapper = createRef();
    state={
        grid:'',
        limit:6,
        skip:0,
        filters:{
            accessories:[]
        }
    }
    componentDidMount(){


        this.props.dispatch(getGuitarBag())
    }
    handleFilters = (filters, categories)=>{
        const newFilters = {...this.state.filters}
        newFilters[categories] = filters;

        this.showFilteredResults(newFilters)
        this.setState({
            filters:newFilters
        })
    }
    showFilteredResults = (filters)=>{
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }
    // loadMoreCards = ()=>{
    //     let skip = this.state.skip + this.state.limit;
    //     this.props.dispatch(getProductsToShop(
    //         skip,
    //         this.state.limit,
    //         this.state.filters,
    //         this.props.products.toShop
    //     )).then(()=>{
    //         this.setState({
    //             skip
    //         })
    //     })

    // }
    handleGrid = ()=>{
        this.setState({
            grid:!this.state.grid ? 'grid_bars':''
        })
    }
    render() {

        return (
            <div >
                <PageTop
                    title="Browse Accessories / Parts"
                />

                <div className="container">
                    <div className="shop_wrapper">
                        <div ref={this.wrapper} className="left">
                            
                        <CollapseRadio 
                                initState={true}
                                title="Accessories"
                                list={accessories}
                                handleFilters={(filters)=>this.handleFilters(filters, 'accessories')}
                                />


                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div className={`grid_btn ${this.state.grid ? '': 'active'}`}
                                        onClick ={()=>this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </div>
                                    <div className={`grid_btn ${!this.state.grid ? '': 'active'}`}
                                        onClick ={()=>this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCard
                                    typeName= {'guitarBag'}
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={this.props.accessories.size}
                                    products = {this.props.accessories.getGuitarBag}
                                    loadMore = {()=>this.loadMoreCards()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        accessories:state.accessories
    }
}
export default connect(mapStateToProps)(Shop);
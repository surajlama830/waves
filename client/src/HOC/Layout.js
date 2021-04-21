import React, { Component } from 'react';
import Footer from '../Components/Header_Footer/Footer';
import Header from '../Components/Header_Footer/Header';

import { connect } from 'react-redux';
import { getSitedData } from './../store/actions/site_action';
class Layout extends Component {
    componentDidMount(){
        if(Object.keys(this.props.site).length === 0){
            this.props.dispatch(getSitedData())
            .then(res=>console.log(res))
        }
    }
    render() {
        return (
            <div>
                <Header/>

                    <div className ="page_container">
                        {this.props.children}
                    </div>

                <Footer data={this.props.site} />
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        site:state.site
    }
}
export default connect(mapStateToProps)(Layout);
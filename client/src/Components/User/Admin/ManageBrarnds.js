import React, { Component } from 'react';

import FormField from '../../utils/Form/FormField';
import { generateData, isFormValid, update, resetFileds } from '../../utils/Form/FormAction';
import { connect } from 'react-redux';
import { addBrand, getBrands } from '../../../store/actions/product_action';

class ManageBrarnds extends Component {
    state ={
        formError:false,
        formSuccess:false,
        formdata:{
            name:{
                element:'input',
                value:'',
                config:{
                    label:'Brand name',
                    name:'name_input',
                    type:'text',
                    placeholder:'Enter Brand'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
            },
        }
    }
    showCategoryItems =()=>(
        this.props.products.brands ? 
            this.props.products.brands.map((item,i)=>(
                <div className="category_item" key={i}>
                    {item.name}
                </div>
            ))
        :null
    )
    componentDidMount(){
        this.props.dispatch(getBrands());
    }
    updateForm = (element)=>{
        const newFormData = update(element, this.state.formdata, 'brands');
        this.setState({
            formError:false,
            formdata:newFormData
        })
    }
    resetFieldHandler(){
        const newFormData = resetFileds(this.state.formdata)

        this.setState({
            formSuccess:true,
            formdata:newFormData
        });
    }
    submitForm = (event)=>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'brands');

        let formIsValid = isFormValid(this.state.formdata, 'brands');
        let existingBrands = this.props.products.brands;

        if(formIsValid){
            this.props.dispatch(addBrand(dataToSubmit, existingBrands ))
            .then(res=>{
                if(res.payload.success){
                    this.resetFieldHandler();

                }else{
                    this.setState({formError:true})
                }
            })
        }else{
            this.setState({
                formError:true
            })
        }

    }
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                           {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">

                        <form onSubmit={event=>this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element)=>this.updateForm(element)}
                            />

                            {this.state.formError ?
                                        <div className="error_label">
                                            Please check your data.
                                        </div>
                                    :null}
                            <button onClick={event=>this.submitForm(event)}>
                                Add Brand
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=>{
    return {
        products:state.products
    }
}

export default connect(mapStateToProps)(ManageBrarnds);
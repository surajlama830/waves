import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../HOC/UserLayout';
import { clearProduct, getBrands } from '../../../../store/actions/product_action';
import FIleUpload from '../../../utils/Form/FIleUpload';

import { generateData, isFormValid, update, pupulateOptionFields, resetFileds } from '../../../utils/Form/FormAction';
import FormField from '../../../utils/Form/FormField';
import { addGuitarTuner } from './../../../../store/actions/accessories_action/tuner_action';

class AddGuitarTuner extends Component {
    state={
        formError:false,
        formSuccess:false,
        formdata:{
            name:{
                element:'input',
                value:'',
                config:{
                    label:'Product name',
                    name:'name_input',
                    type:'text',
                    placeholder:'Enter product name'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            description:{
                element:'textarea',
                value:'',
                config:{
                    label:'Product description',
                    name:'description_input',
                    type:'text',
                    placeholder:'Enter product description'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            price:{
                element:'input',
                value:'',
                config:{
                    label:'Product price',
                    name:'price_input',
                    type:'number',
                    placeholder:'Enter product price'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            brand:{
                element:'select',
                value:'',
                config:{
                    label:'Product brand',
                    name:'price_input',
                    options:[]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            shipping:{
                element:'select',
                value:'',
                config:{
                    label:'Shipping',
                    name:'shipping_input',
                    options:[
                        { key:true, value:'Yes'},
                        { key:false, value:'No'},
                    ]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            available:{
                element:'select',
                value:'',
                config:{
                    label:'Available in Stock',
                    name:'available_input',
                    options:[
                        { key:true, value:'Yes'},
                        { key:false, value:'No'},
                    ]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            publish:{
                element:'select',
                value:'',
                config:{
                    label:'Publish material',
                    name:'publish_input',
                    options:[
                        { key:true, value:'Public'},
                        { key:false, value:'Hidden'},
                    ]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showlabel:true
            },
            images:{
                value:[],
                validation:{
                    required:false
                },
                valid:true,
                touched:false,
                validationMessage:'',
                showlabel:false
            }
        }
    }
    updateFields = (newFormdata)=>{
        this.setState({
            formdata:newFormdata
        })
    }
    updateForm = (element)=>{
        const newFormData = update(element, this.state.formdata, 'accessories');
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
        })
        setTimeout(()=>{
            this.setState({
                formSuccess:false
            },()=>{
                this.props.dispatch(clearProduct())
            })
        },3000)
    }
    submitForm = (event)=>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'accessories');

        let formIsValid = isFormValid(this.state.formdata, 'accessories');
        if(formIsValid){
            this.props.dispatch(addGuitarTuner(dataToSubmit))
            .then(()=>{
                if(this.props.accessories.addGuitarTuner.success){
                    this.resetFieldHandler();
                }else{
                    this.setState({
                        formError:true
                    })
                }
            })
        }else{
            this.setState({
                formError:true
            })
        }

    }
    componentDidMount(){
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then(response=>{
            const newFormData = pupulateOptionFields(formdata, this.props.products.brands, 'brand' );
            this.updateFields(newFormData);
        });
    }
    imageHandler(images){
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid= true;
        this.setState({
            formdata:newFormData 
        })
    }
    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add Accessories/Guitar Tuner</h1>
                    <form onSubmit={event=>this.submitForm(event)}>
                        <FIleUpload
                            imageHandler={(im)=>this.imageHandler(im)}
                            reset = {this.state.formSuccess}
                        />
                        
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element)=>this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element)=>this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element)=>this.updateForm(element)}
                        />
                        {this.state.formSuccess ? 
                            <div className="form_success">
                                Success..
                            </div>
                        :null}
                        {this.state.formError ?
                                        <div className="error_label">
                                            Please check your data.
                                        </div>
                                    :null}
                            <button onClick={event=>this.submitForm(event)}>
                                Add product
                            </button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}
const mapStateToProps = state =>{
    return {
        products:state.products,
        accessories:state.accessories
    }
}
export default connect(mapStateToProps)(AddGuitarTuner);
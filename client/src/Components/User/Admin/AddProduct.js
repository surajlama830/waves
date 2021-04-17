import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../HOC/UserLayout';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../store/actions/product_action';
import FIleUpload from '../../utils/Form/FIleUpload';

import { generateData, isFormValid, update, pupulateOptionFields, resetFileds } from '../../utils/Form/FormAction';
import FormField from '../../utils/Form/FormField';
import DisplayProducts from './DisplayProducts';
import { getProductsToShop } from './../../../store/actions/product_action';

class AddProduct extends Component {
	state = {
		formError: false,
		formSuccess: false,
        limit:6,
        skip:0,
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'Product name',
					name: 'name_input',
					type: 'text',
					placeholder: 'Enter product name'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			description: {
				element: 'textarea',
				value: '',
				config: {
					label: 'Product description',
					name: 'description_input',
					type: 'text',
					placeholder: 'Enter product description'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			price: {
				element: 'input',
				value: '',
				config: {
					label: 'Product price',
					name: 'price_input',
					type: 'number',
					placeholder: 'Enter product price'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			brand: {
				element: 'select',
				value: '',
				config: {
					label: 'Product brand',
					name: 'price_input',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			shipping: {
				element: 'select',
				value: '',
				config: {
					label: 'Shipping',
					name: 'shipping_input',
					options: [ { key: true, value: 'Yes' }, { key: false, value: 'No' } ]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			stock: {
				element: 'input',
				value: '',
				config: {
					label: 'Stock quantity',
					name: 'stock_input',
					type: 'number',
					placeholder: 'Enter quantity of stock'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			wood: {
				element: 'select',
				value: '',
				config: {
					label: 'Wood material',
					name: 'wood_input',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			frets: {
				element: 'select',
				value: '',
				config: {
					label: 'Frets material',
					name: 'frets_input',
					options: [
						{ key: 21, value: 21 },
						{ key: 22, value: 22 },
						{ key: 23, value: 23 },
						{ key: 24, value: 24 }
					]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			publish: {
				element: 'select',
				value: '',
				config: {
					label: 'Publish material',
					name: 'publish_input',
					options: [ { key: true, value: 'Public' }, { key: false, value: 'Hidden' } ]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showlabel: true
			},
			images: {
				value: [],
				validation: {
					required: false
				},
				valid: true,
				touched: false,
				validationMessage: '',
				showlabel: false
			}
		}
	};
	updateFields = (newFormdata) => {
		this.setState({
			formdata: newFormdata
		});
	};
	updateForm = (element) => {
		const newFormData = update(element, this.state.formdata, 'products');
		this.setState({
			formError: false,
			formdata: newFormData
		});
	};
	resetFieldHandler() {
		const newFormData = resetFileds(this.state.formdata);

		this.setState({
			formSuccess: true,
			formdata: newFormData
		});
		setTimeout(() => {
			this.setState(
				{
					formSuccess: false
				},
				() => {
					this.props.dispatch(clearProduct());
				}
			);
		}, 3000);
	}
	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = generateData(this.state.formdata, 'products');

		let formIsValid = isFormValid(this.state.formdata, 'products');
		if (formIsValid) {
			this.props.dispatch(addProduct(dataToSubmit)).then(() => {
				if (this.props.products.addProduct.success) {
					this.resetFieldHandler();
				} else {
					this.setState({
						formError: true
					});
				}
			});
		} else {
			this.setState({
				formError: true
			});
		}
	};
	componentDidMount() {
		const formdata = this.state.formdata;

		this.props.dispatch(getBrands()).then((response) => {
			const newFormData = pupulateOptionFields(formdata, this.props.products.brands, 'brand');
			this.updateFields(newFormData);
		});
		this.props.dispatch(getWoods()).then((response) => {
			const newFormData = pupulateOptionFields(formdata, this.props.products.woods, 'wood');
			this.updateFields(newFormData);
		});

        // call for products
        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit
        ))
	}
	imageHandler(images) {
		const newFormData = {
			...this.state.formdata
		};
		newFormData['images'].value = images;
		newFormData['images'].valid = true;
		this.setState({
			formdata: newFormData
		});
	}
    editProudcts=(id)=>{
        console.log(id)
    }
	render() {
        const products = this.props.products;
		return (
			<UserLayout>
				<div>
					<h1>Add Guitar</h1>
					<form onSubmit={(event) => this.submitForm(event)}>
						<FIleUpload imageHandler={(im) => this.imageHandler(im)} reset={this.state.formSuccess} />

						<FormField
							id={'name'}
							formdata={this.state.formdata.name}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'description'}
							formdata={this.state.formdata.description}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'price'}
							formdata={this.state.formdata.price}
							change={(element) => this.updateForm(element)}
						/>
						<div className="form_devider" />
						<FormField
							id={'brand'}
							formdata={this.state.formdata.brand}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'shipping'}
							formdata={this.state.formdata.shipping}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'stock'}
							formdata={this.state.formdata.stock}
							change={(element) => this.updateForm(element)}
						/>
						<div className="form_devider" />
						<FormField
							id={'wood'}
							formdata={this.state.formdata.wood}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'frets'}
							formdata={this.state.formdata.frets}
							change={(element) => this.updateForm(element)}
						/>
						<div className="form_devider" />
						<FormField
							id={'publish'}
							formdata={this.state.formdata.publish}
							change={(element) => this.updateForm(element)}
						/>
						{this.state.formSuccess ? <div className="form_success">Success..</div> : null}
						{this.state.formError ? <div className="error_label">Please check your data.</div> : null}
						<button onClick={(event) => this.submitForm(event)}>Add product</button>
					</form>
                    <div className="form_devider" />
                    <DisplayProducts 
                        editProudcts={(id)=>this.editProudcts(id)}
                        grid={this.state.grid}
                        limit={this.state.limit}
                        products={products.toShop}
                    />
				</div>
			</UserLayout>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};
export default connect(mapStateToProps)(AddProduct);

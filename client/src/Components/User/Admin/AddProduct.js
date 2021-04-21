import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../HOC/UserLayout';
import { getBrands, getWoods, addProduct, clearProduct, updateProductData } from '../../../store/actions/product_action';
import FIleUpload from '../../utils/Form/FIleUpload';

import { generateData, isFormValid, update, pupulateOptionFields, resetFileds } from '../../utils/Form/FormAction';
import FormField from '../../utils/Form/FormField';
import DisplayProducts from './DisplayProducts';
import { getProductsToShop, getProductDetail } from './../../../store/actions/product_action';
import { populateFields } from './../../utils/Form/FormAction';

class AddProduct extends Component {
	state = {
		formError: false,
		formSuccess: false,
		limit: 6,
		skip: 0,
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
		const Id = this.props.match.params.id;
		let dataToSubmit = generateData(this.state.formdata, 'products');

		let formIsValid = isFormValid(this.state.formdata, 'products');
		if (formIsValid) {
			if(Id){
				this.props.dispatch(updateProductData(dataToSubmit,Id))
				.then(res=>{
					console.log(res.payload.success)
					if(res.payload.success){
						this.setState({
							formSuccess:true
						},()=>{
							setTimeout(()=>{
								this.props.history.push('/admin/add_product')
							},2000)
						})
					}
				})
			}
			else{
				this.props.dispatch(addProduct(dataToSubmit)).then(() => {
					if (this.props.products.addProduct.success) {
						this.resetFieldHandler();
					} else {
						this.setState({
							formError: true
						});
					}
				});
			}
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
		this.props.dispatch(getProductsToShop(this.state.skip, this.state.limit));
		// console.log(this.props.match.params.id)
		const Id = this.props.match.params.id;
		if (Id) {
			this.props.dispatch(getProductDetail(Id)).then((res) => {
				console.log('response', res.payload);
				const newFormData = populateFields(this.state.formdata, res.payload);
				this.setState({
					formdata: newFormData
				});
			});
		}
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
	editProudcts = (id) => {
		this.props.history.push(`/admin/add_product/${id}`);
	};
	loadMore = () => {
		let skip = this.state.skip + this.state.limit;
		this.props
			.dispatch(getProductsToShop(skip, this.state.limit, this.state.filters, this.props.products.toShop))
			.then(() => {
				this.setState({
					skip
				});
			});
	};
	render() {
		const products = this.props.products;
		return (
			<UserLayout>
				<div>
					<h1>{this.props.match.params.id ? 'Update Product' : 'Add product'}</h1>
					<form onSubmit={(event) => this.submitForm(event)}>
						<FIleUpload imageHandler={(im) => this.imageHandler(im)} reset={this.state.formSuccess} />
						<div className="row">
							<div className="col-md-6">
								<FormField
									id={'name'}
									formdata={this.state.formdata.name}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="col-md-6">
								<FormField
									id={'price'}
									formdata={this.state.formdata.price}
									change={(element) => this.updateForm(element)}
								/>
							</div>
						</div>

						<FormField
							id={'description'}
							formdata={this.state.formdata.description}
							change={(element) => this.updateForm(element)}
						/>

						<div className="form_devider" />
						<div className="row">
							<div className="col-md-4">
								<FormField
									id={'brand'}
									formdata={this.state.formdata.brand}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="col-md-4">
								<FormField
									id={'shipping'}
									formdata={this.state.formdata.shipping}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="col-md-4">
								<FormField
									id={'stock'}
									formdata={this.state.formdata.stock}
									change={(element) => this.updateForm(element)}
								/>
							</div>
						</div>

						<div className="form_devider" />
						<div className="row">
							<div className="col-md-6">
								<FormField
									id={'wood'}
									formdata={this.state.formdata.wood}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="col-md-6">
								<FormField
									id={'frets'}
									formdata={this.state.formdata.frets}
									change={(element) => this.updateForm(element)}
								/>
							</div>
						</div>

						<div className="form_devider" />
						<FormField
							id={'publish'}
							formdata={this.state.formdata.publish}
							change={(element) => this.updateForm(element)}
						/>
						{this.state.formSuccess ? <div className="form_success">Success..</div> : null}
						{this.state.formError ? <div className="error_label">Please check your data.</div> : null}
						<button className="btn link_default" onClick={(event) => this.submitForm(event)}>
							{this.props.match.params.id ? 'Update Product' : 'Add product'}
						</button>
					</form>
					<div className="form_devider" />

					{/* load more cards */}
					{this.props.match.params.id ? null : (
						<div>
							<DisplayProducts
								productType="guitar"
								title="Guitars"
								editProudcts={(id) => this.editProudcts(id)}
								grid={this.state.grid}
								limit={this.state.limit}
								products={products.toShop}
							/>
							{products.toShopSize > 0 && products.toShopSize >= this.state.limit ? (
								<div className="load_more_container">
									<span onClick={() => this.loadMore()}>Load More</span>
								</div>
							) : null}
						</div>
					)}
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

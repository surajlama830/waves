import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../HOC/UserLayout';
import { clearProduct, getBrands } from '../../../../store/actions/product_action';
import FIleUpload from '../../../utils/Form/FIleUpload';

import { generateData, isFormValid, update, pupulateOptionFields, resetFileds } from '../../../utils/Form/FormAction';
import FormField from '../../../utils/Form/FormField';
import { addGuitarBag, getGuitarBag, getGuitarDetail,updateGuitarBagData } from './../../../../store/actions/accessories_action/bag_action';

import DisplayProducts from '../DisplayProducts';
import { populateFields } from './../../../utils/Form/FormAction';

class AddGuitarBag extends Component {
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
		const newFormData = update(element, this.state.formdata, 'accessories');
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
		let dataToSubmit = generateData(this.state.formdata, 'accessories');

		let formIsValid = isFormValid(this.state.formdata, 'accessories');
		if (formIsValid) {
			if(Id){
				this.props.dispatch(updateGuitarBagData(dataToSubmit, Id))
				.then(res=>{
					console.log(res.payload.success)
					if(res.payload.success){
						this.setState({
							formSuccess:true
						},()=>{
							setTimeout(()=>{
								this.props.history.push('/admin/accessories_add_bag')
							},2000)
						})
					}
				})
			}
			else{

				this.props.dispatch(addGuitarBag(dataToSubmit)).then(() => {
					if (this.props.accessories.addGuitarBag.success) {
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
		this.props.dispatch(getGuitarBag(this.state.skip, this.state.limit));

		const Id = this.props.match.params.id;
		if(Id){
			this.props.dispatch(getGuitarDetail(Id)).then(res=>{
				console.log("response",res.payload)
				const newFormData = populateFields(this.state.formdata, res.payload)
				this.setState({
					formdata: newFormData
				})
			})
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
		this.props.history.push(`/admin/accessories_add_bag/${id}`);
	};
	loadMore = () => {
		let skip = this.state.skip + this.state.limit;
		this.props.dispatch(getGuitarBag(skip, this.state.limit, this.props.accessories.getGuitarBag)).then(() => {
			this.setState({
				skip
			});
		});
	};
	render() {
		const accessories = this.props.accessories;
		return (
			<UserLayout>
				<div>
					<h1>{this.props.match.params.id ? 'Update Accessories' : 'Add Accessories'}</h1>
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
					{this.props.match.params.id ? null : (
						<div>
							<DisplayProducts
								productType="guitarBag"
								title="Guitars Accessories"
								editProudcts={(id) => this.editProudcts(id)}
								grid={this.state.grid}
								limit={this.state.limit}
								products={accessories.getGuitarBag}
							/>
							{accessories.size > 0 && accessories.size >= this.state.limit ? (
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
		products: state.products,
		accessories: state.accessories
	};
};
export default connect(mapStateToProps)(AddGuitarBag);

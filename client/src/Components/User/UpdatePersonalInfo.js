import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import { generateData, isFormValid, update,populateFields } from '../utils/Form/FormAction';
import {updateUserData, clearUpdateUser} from '../../store/actions/user_action';

import { connect } from 'react-redux';
class UpdatePersonalInfo extends Component {
	state = {
		formError: false,
		formSuccess: false,
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					name: 'name_input',
					type: 'text',
					placeholder: 'Enter your name'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			lastname: {
				element: 'input',
				value: '',
				config: {
					name: 'lastname_input',
					type: 'text',
					placeholder: 'Enter your lastname'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
	};
	updateForm = (element) => {
		const newFormData = update(element, this.state.formdata, 'update_user');
		this.setState({
			formError: false,
			formdata: newFormData
		});
	};
	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = generateData(this.state.formdata, 'update_user');

		let formIsValid = isFormValid(this.state.formdata, 'update_user');
		if (formIsValid) {
			this.props.dispatch(updateUserData(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({
                        formSuccess:true
                    },()=>{
                        setTimeout(()=>{
                            this.props.dispatch(clearUpdateUser());
                            this.setState({
                                formSuccess:false
                            })
                        },2000)
                    })
                }
            })
		} else {
			this.setState({
				formError: true
			});
		}
	};
    componentDidMount(){
        const newFormData = populateFields(this.state.formdata, this.props.user.userData)
        this.setState({
            formdata:newFormData
        })
    }
	render() {
		return (
			<div>
				<form onSubmit={(event) => this.submitForm(event)}>
					<h5 className="mb-3">Personal Information</h5>
					<div className="form_block_two">
						<div className="block">
							<FormField
								id={'name'}
								formdata={this.state.formdata.name}
								change={(element) => this.updateForm(element)}
							/>
						</div>
						<div className="block">
							<FormField
								id={'lastname'}
								formdata={this.state.formdata.lastname}
								change={(element) => this.updateForm(element)}
							/>
						</div>
					</div>
					<div>
						<FormField
							id={'email'}
							formdata={this.state.formdata.email}
							change={(element) => this.updateForm(element)}
						/>
					</div>
					<div>
                        {this.state.formSuccess ? <div className="form_success">Success</div>:null}
						{this.state.formError ? <div className="error_label">Please check your data.</div> : null}
						<button className="btn link_default" onClick={(event) => this.submitForm(event)}>Update Personal Info</button>
					</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps =(state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(UpdatePersonalInfo);

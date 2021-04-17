import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import Axios from 'axios';

class FIleUpload extends Component {
	constructor() {
		super();
		this.state = {
			uploadedFiles: [],
			uploading: false,
			files: [],
			file: '',
			imagePreviewUrl: ''
		};
	}
	onDrop = (file) => {
		// console.log(file);
		this.setState(
			{
				uploading: true
			},
			() => {
				let reader = new FileReader();
				let image = file[0];

				reader.onloadend = () => {
					this.setState({
						files: [ ...this.state.files, image ],
						imagePreviewUrl: [ ...this.state.imagePreviewUrl, reader.result ],
                        uploading: false,
					});
				};
				// console.log(image);

				reader.readAsDataURL(image);
                console.log(this.state.files)

				// ! TODO

				let formData = new FormData();
				const config = {
					header: { 'content-type': 'multipart/form-data' }
				};
				formData.append('file', file[0]);
                
				Axios.post('/api/users/uploadfile', formData, config)
                
                .then((res) => {
					console.log(res.data);
					if (res.data.success) {
						this.setState({
							uploading: false,
							uploadedFiles: [ ...this.state.uploadedFiles, res.data.file ]
						});
						this.props.imageHandler(this.state.uploadedFiles);
					}
				});
			}
		);
	};
	onRemove(filename) {
		Axios.get(`/api/users/remove_image?filename=${filename}`).then((res) => {
			console.log(res.data);
			let images = this.state.uploadedFiles.filter((item) => {
				return item.filename !== filename;
			});
			this.setState(
				{
					uploadedFiles: images
				},
				() => {
					this.props.imageHandler(this.state.uploadedFiles);
				}
			);
		});
	}
	showUpLoadedImages = () => {
		let showimages = this.state.uploadedFiles.map((item, i) => (
			<div className="dropzone_box" key={i} onClick={() => this.onRemove(item.filename)}>
				<div
					className="wrap"
					style={{
						background: `url(${process.env.PUBLIC_URL}/uploads/${item.filename}) no-repeat `
					}}
				/>
			</div>
		));
		return showimages;
	};
	static getDerivedStateFromProps(props, state) {
		if (props.reset) {
			return (state = {
				uploadedFiles: []
			});
		}
		return null;
	}
	render() {
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;

		if (imagePreviewUrl.length > 0)
			$imagePreview = (
				<div style={{ display: 'flex'  }}>
					{imagePreviewUrl.map((item,i) => <img key={i} style={{ 
                        width: '100px',
                        height:'100px',
                        objectFit:'cover' ,
                        padding:'10px'
                        }} src={item} alt="images" />)}
				</div>
			);

		return (
			<section>
				<div className="dropzone clear">
					<Dropzone onDrop={(e) => this.onDrop(e)} multiple={false} className="dropzone_box">
						{({ getRootProps, getInputProps }) => (
							<div {...getRootProps()} className="wrap" style={{}}>
								<input {...getInputProps()} />
								<div
									style={{
										padding: '20px',
										background: '#f7f7f7',
										// position:'relative',
										// top:'10px',
										width: '50px',
										margin: '10px'
									}}
								>
									<FontAwesomeIcon
										icon={faPlus}
										style={{
											padding: '10px',
											background: '#404040',
											fontSize: '2rem',
											color: '#fff',
											borderRadius: '500px'
										}}
									/>
								</div>
							</div>
						)}
					</Dropzone>
					{/* {this.showUpLoadedImages()} */}
					{$imagePreview}
					{this.state.uploading ? (
						<div
							className="dropzone_box"
							style={{
								textAlign: 'center',
								paddingTop: '60px'
							}}
						>
							<CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
						</div>
					) : null}
				</div>
			</section>
		);
	}
}

export default FIleUpload;

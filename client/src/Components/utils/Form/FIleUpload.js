import React, { Component } from 'react';

import Dropzone from 'react-dropzone'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import Axios from 'axios';


class FIleUpload extends Component {
    constructor(){
        super();
        this.state={
            uploadedFiles:[],
            uploading:false,
            files:[]
        }
    }
    onDrop=(file)=>{
        this.setState({
            uploading:true
        },()=>{

            let formData = new FormData();
            const config={
                header:{'content-type':'multipart/form-data'}
            }
            formData.append('file',file[0])    
            Axios.post('/api/users/uploadfile', formData, config)
            .then(res=>{
                console.log(res.data)
                if(res.data.success){
                    this.setState({
                        uploading:false,
                        uploadedFiles:[
                            ...this.state.uploadedFiles,
                            res.data.file
                        ]
                    })
                }
            })
            .then(()=>{
                this.props.imageHandler(this.state.uploadedFiles);
            })
        });
    }
    onRemove(filename){
        Axios.get(`/api/users/remove_image?filename=${filename}`)
        .then(res=>{
            console.log(res.data)
            let images = this.state.uploadedFiles.filter(item=>{
                return item.filename !== filename
            })
            this.setState({
                uploadedFiles:images
            },()=>{
                this.props.imageHandler(this.state.uploadedFiles);
            })
        })
    }
    showUpLoadedImages =()=>{
        let showimages= this.state.uploadedFiles.map((item,i)=>(
            <div 
                className="dropzone_box"
                key={i}
                onClick = {()=>this.onRemove(item.filename)}
            >
                <div className="wrap"
                    style={{
                        background:`url(${process.env.PUBLIC_URL}/uploads/${item.filename}) no-repeat `
                    }}
                    >
                </div>
            </div>
        ))
        return showimages;
    }
    static getDerivedStateFromProps(props,state){
        if(props.reset){
            return state={
                uploadedFiles:[]
            }
        }
        return null;
    }
    render() {
        return (
                    <section>
                        <div className="dropzone clear">
                            <Dropzone
                                onDrop={(e)=>this.onDrop(e)}
                                multiple={false}
                                className="dropzone_box"
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="wrap" style={{
                                        
                                    }}>
                                      <input {...getInputProps()} />
                                      <div style={{
                                        padding:'20px',
                                        background:'#f7f7f7',
                                        // position:'relative',
                                        // top:'10px',
                                        width:'50px',
                                        margin:'10px',
                                        }} >
                                    <FontAwesomeIcon icon={faPlus} style={{
                                        padding:'10px',
                                        background:'#404040',
                                        fontSize:"2rem",
                                        color:'#fff',
                                        borderRadius:'500px'
                                        }}/>
                                    </div>      
                                    </div>
                                
                                )}

                            </Dropzone>
                            {this.showUpLoadedImages()}
                            {
                                this.state.uploading ?
                                <div className="dropzone_box" style={{
                                    textAlign:'center',
                                    paddingTop:'60px'
                                }}>
                                    <CircularProgress 
                                        style={{color:'#00bcd4'}}
                                        thickness={7}
                                    />
                                </div>
                                :null
                            }
                        </div>
                    </section>
        );
    }
}

export default FIleUpload;
import React, { Component } from 'react';

import Dropzone from 'react-dropzone'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';


class FIleUpload extends Component {
    constructor(){
        super();
        this.state={
            uploadedFiles:[],
            uploading:false
        }
    }
    onDrop=(files)=>{
        console.log(files)
    }
    showUpLoadedImages =()=>{

    }
    render() {
        return (
            <div>
                    <section>
                        <div className="dropzone clear">
                            <Dropzone
                                onDrop={(e)=>this.onDrop(e)}
                                multiple={false}
                                className="dropzone_box"
                            >
                                {/*  */}
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                      <input {...getInputProps()} />
                                      <div className="wrap">
                                    <FontAwesomeIcon icon={faPlus} style={{padding:'30px',background:'#f7f7f7',fontSize:"4rem"}}/>
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
                </div>
        );
    }
}

export default FIleUpload;
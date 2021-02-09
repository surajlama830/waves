import React, { Component } from 'react';
import ImageLightBox from '../utils/ImageLightBox';

class ProdImg extends Component {
    state={
        lightbox:false,
        imagePos:0,
        lightboxImages:[]
    }
    componentDidMount(){
        
        if(this.props.detail.images.length > 0){
            let lightboxImages = [];
            
            this.props.detail.images.forEach(item=>{
                lightboxImages.push(item.filename)
            })
            this.setState({
                lightboxImages
            })
        }
    }
    handleLightBox=(pos)=>{
        if(this.state.lightboxImages.length > 1){
            this.setState({
                lightbox:true,
                imagePos:pos
            })
        }
    }
    handleLightBoxClose = ()=>{
        this.setState({
            lightbox:false
        })
    }
    showThumbs=()=>(
        this.state.lightboxImages.map((item,i)=>(
            i > 0 ?
                    <div 
                        key={i}
                        onClick={()=>this.handleLightBox(i)}
                        className="thumb"
                        style={{ background:`url(${process.env.PUBLIC_URL}/uploads/${item}) no-repeat`}}
                    > </div>
            :null
        ))
    )
    renderCardImage=(images)=>{
        if(images.length > 0){
            return images[0].filename
        }else{
            return 'image_not_availble.png'
        }
    }
    render() {
        const {detail} = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div 
                        style={{ background: `url(${process.env.PUBLIC_URL}/uploads/${this.renderCardImage(detail.images)}) no-repeat`}}
                        onClick={()=>this.handleLightBox(0)}
                    >

                    </div>
                </div>
                <div className="main_thumbs">
                    {this.showThumbs()}
                </div>
                {
                    this.state.lightbox ?
                        <ImageLightBox 
                            images={this.state.lightboxImages}
                            open={this.state.lightbox}
                            pos={this.state.imagePos}
                            onClose={()=>this.handleLightBoxClose()}
                        />
                    :null
                }
            </div>
        );
    }
}

export default ProdImg;
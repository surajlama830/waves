import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ImageLightBox extends Component {
    state={
        lightboxIsOpen : true,
        currentImage: this.props.pos,
        images:[]
    }
    static getDerivedStateFromProps(props, state){
        if(props.images){
            const images = [];
            props.images.forEach(element=>{
                images.push(`${process.env.PUBLIC_URL}/uploads/${element}`)
            })
            return state={
                images
            }
        }
        return false
    }
    closeLightBox(){
        this.props.onClose();
    }
    render() {
        console.log(this.state)
        const {currentImage, images} = this.state;
        return (
            <div>
                <Lightbox
                mainSrc={images[currentImage]}
                nextSrc={images[(currentImage + 1) % images.length]}
                prevSrc={images[(currentImage + images.length - 1) % images.length]}
                onCloseRequest={() => this.closeLightBox()}
                onMovePrevRequest={() =>
                this.setState({
                    currentImage: (currentImage + images.length - 1) % images.length,
                })
                }
                onMoveNextRequest={() =>
                this.setState({
                    currentImage: (currentImage + 1) % images.length,
                })
                }
            />
            </div>
        );
    }
}

export default ImageLightBox;
import React, { Component } from "react";

import HomePromotion from "./Home_promotion";
import HomeSlider from "./Home_slider";

import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell,
} from "../../store/actions/product_action";
import CardBlock from "../utils/CardBlock";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  state = {
    products: [
      {
        title: "Guitar Best",
        price: "123",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestiae labore culpa numquam quaerat vel error voluptatum ex! Excepturi alias temporibus accusamus illo perspiciatis consectetur inventore vero voluptatem modi neque?",
        brand: {
          name: "Brand 1",
        },
      },
      {
        title: "Guitar Best 2",
        price: "123",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestiae labore culpa numquam quaerat vel error voluptatum ex! Excepturi alias temporibus accusamus illo perspiciatis consectetur inventore vero voluptatem modi neque?",
        brand: {
          name: "Brand 2",
        },
      },
      {
        title: "Guitar Best 3",
        price: "123",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestiae labore culpa numquam quaerat vel error voluptatum ex! Excepturi alias temporibus accusamus illo perspiciatis consectetur inventore vero voluptatem modi neque?",
        brand: {
          name: "Brand 3",
        },
      },
    ],
  };

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.state.products} title="Best Selling Guitars" />
        <HomePromotion />
        <CardBlock list={this.state.products} title="Best Selling Guitars" />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Home);

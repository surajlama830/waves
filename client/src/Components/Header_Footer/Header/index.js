import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh, faTimes } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/user_action";

class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true,
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true,
      },
      {
        name: "Accessories",
        linkTo: "/accessories",
        public: true,
      },
    ],
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false,
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false,
      },
      {
        name: "Log in",
        linkTo: "/register_login",
        public: true,
      },
      {
        name: "Log Out",
        linkTo: "/user/logout",
        public: false,
      },
    ],
    showResponsive: false,
  };

  toggleResponsiveMenu = () => {
    this.setState({
      ...this.state,
      showResponsive: !this.state.showResponsive,
    });
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };
  defaultLink = (item, i) =>
    item.name === "Log Out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i} onClick={this.toggleResponsiveMenu}>
        {item.name}
      </Link>
    );
  cartLink = (item, i) => {
    const user = this.props.user.userData;
    console.log(user.cart);
    return (
      <div className="cart_link" key={i}>
        <Link to={item.linkTo}>{item.name}</Link>
        <span>{user.cart ? user.cart.length : 0} </span>
      </div>
    );
  };
  showLinks = (type) => {
    let list = [];
    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }
    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };
  render() {
    const { showResponsive } = this.state;
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="bottom d-none d-lg-block">
              {this.showLinks(this.state.page)}
              {this.showLinks(this.state.user)}
            </div>
            <div
              className={`responsive__menu d-lg-none ${
                showResponsive ? "left__0" : ""
              }`}
            >
              {this.showLinks(this.state.page)}
              {this.showLinks(this.state.user)}
            </div>

            {showResponsive ? (
              <div
                className="hamburger__menu d-lg-none"
                onClick={this.toggleResponsiveMenu}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            ) : (
              <div
                className="hamburger__menu d-lg-none"
                onClick={this.toggleResponsiveMenu}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(withRouter(Header));

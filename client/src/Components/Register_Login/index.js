import React from "react";
import Button from "../utils/Button";
import Login from "./Login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container row">
          <div className="left col-lg-6">
            <h1>New Customer</h1>
            <p>
              Lore ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo cosequat.
            </p>
            <Button
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="right col-lg-6">
            <h2>Registered Customer</h2>
            <p>If you have an account please login.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;

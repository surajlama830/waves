import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import RegisterLogin from './Components/Register_Login';
import Register from './Components/Register_Login/Register';
import UserDashboard from './Components/User';
import Auth from './HOC/Auth';
import Layout from './HOC/Layout';
import Shop from './Components/Shop';
import AddProduct from './Components/User/Admin/AddProduct';

import ManageCategories from './Components/User/Admin/ManageCategories';
import ProductPage from './Components/Product';

const  Routes =()=> { 
  
  return (
       <Layout>
          <Switch>

            <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
            <Route path="/admin/add_product" exact component={Auth(AddProduct, true)}/>
            <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)}/>

            <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
            <Route path="/register" exact component={Auth(Register, false)}/>
            
            <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)}/>
            <Route path="/" exact component={Auth(Home,null)}/>
            <Route path="/shop" exact component={Auth(Shop,null)}/>
          </Switch>
       </Layout>
    );

}

export default Routes;

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
import Cart from './Components/User/Cart'; 
import AddString from './Components/User/Admin/AddAccessories/AddString';
import AddGuitarBag from './Components/User/Admin/AddAccessories/AddGuitarBag';
import AddGuitarCable from './Components/User/Admin/AddAccessories/AddGuitarCable';
import AddGuitarCapo from './Components/User/Admin/AddAccessories/AddGuitarCapo';
import AddGuitarStand from './Components/User/Admin/AddAccessories/AddGuitarStand';
import AddGuitarTuner from './Components/User/Admin/AddAccessories/AddGuitarTuner';
import AddGuitarStrap from './Components/User/Admin/AddAccessories/AddGuitarStrap';
import AddGuitarPicks from './Components/User/Admin/AddAccessories/AddGuitarPicks';

const  Routes =()=> { 
  
  return (
       <Layout>
          <Switch>

            <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>

            <Route path="/user/cart" exact component={Auth(Cart, true)}/>

            <Route path="/admin/add_product" exact component={Auth(AddProduct, true)}/>

            <Route path="/admin/accessories_add_bag" exact component={Auth(AddGuitarBag, true)}/>
            <Route path="/admin/accessories_add_cable" exact component={Auth(AddGuitarCable, true)}/>
            <Route path="/admin/accessories_add_capo" exact component={Auth(AddGuitarCapo, true)}/>
            <Route path="/admin/accessories_add_picks" exact component={Auth(AddGuitarPicks, true)}/>
            <Route path="/admin/accessories_add_stand" exact component={Auth(AddGuitarStand, true)}/>
            <Route path="/admin/accessories_add_strap" exact component={Auth(AddGuitarStrap, true)}/>
            <Route path="/admin/accessories_add_tuner" exact component={Auth(AddGuitarTuner, true)}/>
            <Route path="/admin/accessories_add_string" exact component={Auth(AddString, true)}/>

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

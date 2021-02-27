import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const links = [
    {
        name:'My Account',
        linkTo:'/user/dashboard'
    },
    {
        name:'User information',
        linkTo:'/user/user_profile'
    },
    {
        name:'My Cart',
        linkTo:'/user/cart'
    },
]
const admin = [
    {
        name:'Site info',
        linkTo:'/admin/site_info'
    },
    {
        name:'Add guitar',
        linkTo:'/admin/add_product'
    },
    {
        name:'Add bag',
        linkTo:'/admin/accessories_add_bag'
    },
    {
        name:'Add cable',
        linkTo:'/admin/accessories_add_cable'
    },
    {
        name:'Add capo',
        linkTo:'/admin/accessories_add_capo'
    },
    {
        name:'Add picks',
        linkTo:'/admin/accessories_add_picks'
    },
    {
        name:'Add stand',
        linkTo:'/admin/accessories_add_stand'
    },
    {
        name:'Add strap',
        linkTo:'/admin/accessories_add_strap'
    },
    {
        name:'Add string',
        linkTo:'/admin/accessories_add_string'
    },
    {
        name:'Add tuner',
        linkTo:'/admin/accessories_add_tuner'
    },
    {
        name:'Manage categories',
        linkTo:'/admin/manage_categories'
    },
]

const UserLayout = (props) => {
    const generateLinks = (links)=> (
        links.map((item,i)=>(
            <Link key={i} to={item.linkTo}>
                {item.name}
            </Link>
        ))
    )
    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My Account</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    {
                        props.user.userData.isAdmin ?
                            <div>
                                <h2>Admin</h2>
                                <div className="links">
                                    {generateLinks(admin)}
                                </div>
                            </div>
                        :null
                    }
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(UserLayout);
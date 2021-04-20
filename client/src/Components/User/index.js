import React from 'react';
import UserLayout from '../../HOC/UserLayout';
import Button from '../utils/Button';
import HistoryBlock from './../utils/User/HistoryBlock';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className='user_nfo_panel'>
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <Button 
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                {user.userData.history?
                <div className="user_nfo_panel">
                    <h1>History purchases</h1>
                    <div className="user_product_block_wrapper">
                       <HistoryBlock 
                       products={user.userData.history}
                       />
                    </div>
                </div>
                :null}
            </div>
        </UserLayout>
    );
};

export default UserDashboard;
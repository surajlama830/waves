import React from 'react';
import UserLayout from '../../../HOC/UserLayout';
import ManageBrands from './ManageBrarnds';
import ManageWoods from './ManageWoods';



const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands />
            <ManageWoods />
        </UserLayout>
    );
};

export default ManageCategories;
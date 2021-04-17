import React from 'react';
import UserLayout from '../../HOC/UserLayout';
import UpdatePersonalInfo from './UpdatePersonalInfo';

const UpdateProfile = () => {
	return (
		<UserLayout>    
			<h1>Profile</h1>
			<UpdatePersonalInfo/> 
		</UserLayout>
	);
};

export default UpdateProfile;

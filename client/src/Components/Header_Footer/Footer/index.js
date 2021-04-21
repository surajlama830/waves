import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ data }) => {
	console.log(data)
	return data.siteData ? (
		<footer className="bck_b_dark">
			<div className="container">
				<div className="logo py-5">WAVES</div>
				<div className="wrapper pt-4 row">
					<div className="left col-md-6">
						<h2 className="pb-4">Contact Information</h2>
						<div className="business_nfo row">
							<div className="tag col-6">
								<FontAwesomeIcon icon={faCompass} className="icon" />
								<div className="nfo">
									<div>Address</div>
									<div>{data.siteData[0].address}</div>
								</div>
							</div>
							<div className="tag col-6">
								<FontAwesomeIcon icon={faPhone} className="icon" />
								<div className="nfo">
									<div>Phone</div>
									<div>{data.siteData[0].phone}</div>
								</div>
							</div>
							<div className="tag col-6">
								<FontAwesomeIcon icon={faClock} className="icon" />
								<div className="nfo">
									<div>Working Hours</div>
									<div>{data.siteData[0].hours}</div>
								</div>
							</div>
							<div className="tag col-6">
								<FontAwesomeIcon icon={faEnvelope} className="icon" />
								<div className="nfo">
									<div>Email</div>
									<div>{data.siteData[0].email}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="left col-md-6 d-none d-md-block">
						<h2>Be the first to know.</h2>
						<div>
							<div>Get all the latest information on events, sales and offers. You can miss out.</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	) : null;
};

export default Footer;

import React from 'react';
import moment from 'moment';

const HistoryBlock = (props) => {
	const renderBlocks = () =>
		props.products
			? props.products.map((product, i) => (
					<tr key={i}>
						<td>{moment(product.dateOfPurchase).format('MM-DD-YYYY')}</td>
						<td>
							{product.brand.name} {product.name}
						</td>

						<td>$ {product.price}</td>
						<td>$ {product.quantity}</td>
					</tr>
				))
			: null;

	return (
		<div className="history_blocks">
			<table>
				<thead>
					<tr>
						<th>Date or Purchase</th>
						<th>Product</th>
						<th>Price paid</th>
						<th>Quantity</th>
						{/* <th>Date or Purchase</th> */}
					</tr>
				</thead>
				<tbody>{renderBlocks()}</tbody>
			</table>
		</div>
	);
};

export default HistoryBlock;

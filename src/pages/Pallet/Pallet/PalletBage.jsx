import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {TextBlock }from '../../../components';


const PalletBage = ({ pallet }) => {

	if (!pallet) {
		return (
			<div className=''>
				Нет паллеты
			</div>
		)
	}

	return (


		<Link to={`${pallet._id}`} className='' >

			<TextBlock className=''>Паллета {pallet.title}</TextBlock>

		</Link>


	);
};

export default PalletBage;
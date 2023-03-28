import React, { useState } from 'react';
import { Link } from 'react-router-dom'


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

			<span className=''>Паллета {pallet.title}</span>

		</Link>


	);
};

export default PalletBage;
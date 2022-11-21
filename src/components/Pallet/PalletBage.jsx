import React, { useState } from 'react';
import { Link } from 'react-router-dom'


const PalletBage = ({ pallet }) => {

	if (!pallet) {
		return (
			<div className=''>
				Загрузка...
			</div>
		)
	}

	return (
		<div className=' ' >




			<Link to={`${pallet._id}`} className='' >

				<div className=''>

					<span className=''>Паллета {pallet.title}</span>
				</div>

			</Link>









		</div>
	);
};

export default PalletBage;
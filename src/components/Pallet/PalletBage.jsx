import React, { useState } from 'react';
import { Link } from 'react-router-dom'


const PalletBage = ({ pallet }) => {

	if (!pallet) {
		return (
			<div className='text-xl text-center text-white py-10'>
				Загрузка...
			</div>
		)
	}

	return (
		<div className='flex flex-col justify-center my-5 ' >




			<Link to={`${pallet._id}`} className='my-1 mx-1 p-1 rounded-md' >

				<div className='p-2 flex justify-between bg-blue-400 text-white shadow-lg shadow-slate-400 rounded-md'>

					<span className='flex items-center text-lg'>Паллета {pallet.title}</span>
				</div>

			</Link>









		</div>
	);
};

export default PalletBage;
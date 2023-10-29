import React from 'react'
import { Link } from 'react-router-dom'

export default function PalletBage({ title, id }) {
	return (
		<Link
			className='
			
			w-full 
				flex items-center justify-center
				  p-3 rounded text-2xl
				border-2 border-amber-500 
				 bg-transparent  hover:bg-amber-500/20
				text-amber-100 hover:text-white
				 shadow-inner hover:shadow-amber-500
			transition ease-in-out duration-300
			'
			to={`/pallets/${id}`}
		>
			{title}
		</Link>
	)
}

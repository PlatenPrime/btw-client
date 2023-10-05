import React from 'react'
import { Link } from 'react-router-dom'

export default function PalletBage({ title, id }) {
	return (
		<Link
			className='
			w-full xl:w-1/6 lg:w-1/4 md:w-1/2
				flex items-center justify-center
				  p-3 rounded 
				border-2 border-sky-500 
				 bg-transparent  hover:bg-sky-500/20
				text-sky-100 hover:text-white
				 shadow-inner hover:shadow-sky-500
			transition ease-in-out duration-300
			'
			to={`/pallets/${id}`}
		>
			{title}
		</Link>
	)
}

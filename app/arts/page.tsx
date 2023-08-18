import Link from 'next/link'
import React from 'react'
import { Metadata } from "next";
import getAllArts from '@/lib/getAllArts';



export const metadata: Metadata = {
	title: "Артикули",

}

export default async function ArtsPage() {

	const artsData: Promise<Art[]> = getAllArts()

	const arts = await artsData;


	// const firstTen = arts.slice(0, 10)


	// const sectioncontent = arts.map(art => (
	// 			<h1 key={art._id} >{art.artikul}</h1>
	// 		))
		


	return (

		<>
			<div className='text-center text-lg'>Сторінка артикулів</div>
			<Link href="/" className='bg-sky-600 p-2' >На головну</Link>
			{/* {sectioncontent} */}
		</>
	)
}

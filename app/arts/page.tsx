import Link from 'next/link'
import React from 'react'
import { Metadata } from "next";
import getAllArts from '@/lib/getAllArts';



export const metadata: Metadata = {
	title: "Артикули",

}

export default async function ArtsPage() {

	const artsData: Promise<ObjectOfArtsArray> = getAllArts()

	const arts = await artsData;


	// const firstTen =   arts.map(art => (
	// 	<h1 key={art._id} >{art.artikul}</h1>
	// ))

	const firstTen = (
		<section>

			{arts.arts.slice(0, 10).map(art => {
				return (
					<>
						<p key={art._id}>
							<Link href={`/arts/${art._id}`}>{art.nameukr}</Link>
						</p>
						<br />
					</>
				)
			})}
		</section>
	)



	return (

		<>
			<div className='text-center text-lg'>Сторінка артикулів</div>
			<Link href="/" className='bg-sky-600 p-2' >На головну</Link>
			{firstTen}
		</>
	)
}

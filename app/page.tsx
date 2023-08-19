import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'



export const metadata: Metadata = {
	title: "BTW",

}

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-start ">

			<h2 className='bg-sky-800 w-full text-center text-2xl'>Головна сторінка</h2>

			<Link href="/arts">На сторінку артикулів</Link>

		</main>
	)
}

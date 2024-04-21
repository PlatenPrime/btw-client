import React from 'react'
import YouTube from 'react-youtube';
import { extractVideoId } from '../../../utils/youtube';
import CardBlock from '../blocks/CardBlock';

export default function YoutubeCard({
	url
}) {

	const id = extractVideoId(url)

	return (

		<CardBlock
			className="flex justify-center items-center bg-blue-500/10 p-2 rounded-xl  w-full"
		>
			<CardBlock
				className="shadow-lg shadow-blue-500 "
			>
				<YouTube
					videoId={id}
					
				/>
			</CardBlock>
		</CardBlock>

	)
}

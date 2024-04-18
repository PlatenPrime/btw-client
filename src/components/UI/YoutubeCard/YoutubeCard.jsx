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
			className="flex justify-center items-center bg-red-500/10 p-2 rounded-xl w-full"
		>
			<YouTube
				videoId={id}
			/>
		</CardBlock>

	)
}

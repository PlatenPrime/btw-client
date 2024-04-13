import React from 'react'
import YouTube from 'react-youtube';
import { extractVideoId } from '../../../utils/youtube';

export default function YoutubeCard({
	url
}) {

	const id = extractVideoId(url)

	return (
		<YouTube
			videoId={id}
		/>
	)
}

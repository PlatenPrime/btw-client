import React from 'react'

	;

import { FaPlay } from "react-icons/fa";

import { TextBlock,  ContainerBlock } from '../../index'
import ReactPlayer from 'react-player/youtube'

export default function YoutubeCard({
	url
}) {



	return (


		<ContainerBlock
			className="shadow-lg  w-full flex justify-center items-center"
		>
			<ReactPlayer
				url={url}
				light
				controls
				playIcon={
					<TextBlock
						className="text-5xl text-sky-500 hover:text-sky-400"
					>
						<FaPlay />
					</TextBlock>
				}


			/>
		</ContainerBlock>


	)
}

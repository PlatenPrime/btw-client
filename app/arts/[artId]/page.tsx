import React from 'react'

type Params = {
	params: {
		artId: string
	}
}




export default function ArtPage({ params: { artId }} : Params) {
  return (
	<div>ArtPage</div>
  )
}

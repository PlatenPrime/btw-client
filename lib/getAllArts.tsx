import React from 'react'


export default async function getAllArts() {

	const res = await fetch("https://btw-server.up.railway.app/api/arts")


	if (!res.ok) {
		throw new Error("Failed to fetch artikuls")
	}


	return res.json()
}

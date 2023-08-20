

export default async function getArt(artId: string) {

	const res = await fetch(`https://btw-server.up.railway.app/api/arts/${artId}`)

	if (!res.ok) throw new Error("failed art fetch")



	return res.json()
}

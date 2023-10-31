import { useArtContext } from "../../ArtContext";


export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();




	return (
		<PageBTW
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-white shadow-md shadow-white"
			>
				Артикул
			</HeaderBlock>

			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>


			</CardBlock>
		</PageBTW>
	)
}

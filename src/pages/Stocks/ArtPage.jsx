import { useEffect, useState } from "react";
import { useArtContext } from "../../ArtContext";
import { CardBlock, HeaderBlock, PageBTW, Spinner } from "../../components";
import useArtikulStore from "./stores/artsStore";
import { useParams } from "react-router-dom";


export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();
	const { id } = useParams()
	const getArtikulById = useArtikulStore((state) => state.getArtikulById);




	// STATES

	const [artikul, setArtikul] = useState(null)
	const [isLoadingArtikul, setIsLoadingArtikul] = useState(false)



	useEffect(() => {


		const fetchArtikul = async () => {
			try {
				setIsLoadingArtikul(true)
				const artikul = await getArtikulById(id)
				console.log(artikul)
				setArtikul(artikul)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingArtikul(false)
			}

		}

		fetchArtikul()

	}, [id])




	return (
		<PageBTW
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-white shadow-md shadow-white"
			>
				{isLoadingArtikul ? <Spinner color="white" /> : <>{artikul?.artikul}</>}
			</HeaderBlock>

			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>

				<CardBlock>
					Інформація по артикулу
				</CardBlock>


				<CardBlock>
					Палети на яких знаходиться артикул
				</CardBlock>





			</CardBlock>

		</PageBTW>
	)
}

import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import useFetchArts from '../../hooks/useFetchArts'
import ModalCreateAsk from './components/modals/ModalCreateAsk'
import useFetchDefs from './hooks/useFetchDefs'
import useFetchAsks from '../Asks/hooks/useFetchAsks'
import DefBage from './components/DefBage'
import useFetchRemainsDefs from './hooks/useFetchRemainsDefs'
import { formatDateToUkrainianFull, formatDateToUkrainianShort } from "../../utils/formatDate"


export default function DefsPage() {

	const { defs, time, isDefsLoading, errorDefs } = useFetchDefs()
	const { remainsDefs, isRemainsDefsLoading, errorRemainsDefs } = useFetchRemainsDefs()

	const [isMorning, setIsMorning] = useState(true)
	const items = isMorning ? remainsDefs : defs

	const { asks, isAsksLoading } = useFetchAsks()
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()

	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)




	return (
		<PageBTW
			isLoading={isDefsLoading || isAsksLoading || loadingArtsDB || isRemainsDefsLoading}
			className=" "
		>
			<HeaderBlock
				className="bg-pink-500 shadow-lg shadow-pink-500"
			>
				Дефіцити
			</HeaderBlock>

			<ModalCreateAsk
				artikul={newAskArtikul}
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
			/>

			<ButtonGroup>

				<ButtonBlock
					className={` ${isMorning ? 'pink-b-n' : 'pink-b'}   `}
					onClick={() => setIsMorning(true)}
				>
					Ранок
				</ButtonBlock>

				<ButtonBlock
					className={` ${isMorning ? 'pink-b' : 'pink-b-n'}   `}
					onClick={() => setIsMorning(false)}
				>
					Актуальні
				</ButtonBlock>

			</ButtonGroup>



			<ContainerBlock
				className="space-y-2 pb-4"
			>


				<TextBlock
					className="text-lg font-bold text-slate-200"
				>
					{isMorning
						?
						<>Ранок {formatDateToUkrainianShort(new Date())}</>
						:
						<>{formatDateToUkrainianFull(time)}</>
					}
				</TextBlock>


				{items?.length > 0
					?
					<>
						{items?.map((def, i) =>
							<DefBage
								key={i}
								def={def}
								artsDB={artsDB}
								asks={asks}
								setShowModalCreateAsk={setShowModalCreateAsk}
								setNewAskArtikul={setNewAskArtikul}
							/>
						)}
					</>
					:
					<TextBlock
						className="italic"
					>
						Дефіцитів немає
					</TextBlock>
				}
			</ContainerBlock>

		</PageBTW >
	)
}

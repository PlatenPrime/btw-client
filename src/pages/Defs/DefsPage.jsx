import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalConfirm, PageBTW, TextBlock } from '../../components'
import useFetchArts from '../../hooks/useFetchArts'
import ModalCreateAsk from './components/modals/ModalCreateAsk'
import useFetchDefs from './hooks/useFetchDefs'
import useFetchAsks from '../Asks/hooks/useFetchAsks'
import DefBage from './components/DefBage'
import useFetchRemainsDefs from './hooks/useFetchRemainsDefs'
import { formatDateToUkrainianFull, formatDateToUkrainianShort } from "../../utils/formatDate"
import { CalculateIcon } from '../../components/UI/Icons'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
import { MdSunny, MdSunnySnowing } from 'react-icons/md'


export default function DefsPage() {

	const { defs, time, isDefsLoading, errorDefs } = useFetchDefs()
	const { remainsDefs, isRemainsDefsLoading, errorRemainsDefs } = useFetchRemainsDefs()

	const [isMorning, setIsMorning] = useState(false)
	const items = isMorning ? remainsDefs : defs

	const { asks, isAsksLoading } = useFetchAsks()


	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)


	const [isShowModalCalculate, setIsShowModalCalculate] = useState(false)





	const handleCalculateDefsOutOfSchedule = async () => {
		try {
			toast.info("Розрахунок виконується на сервері...")
			setIsShowModalCalculate(false)
			await axios.get("/defs/calculate")
		} catch (error) {
			console.log(error);
		}
	}



	return (
		<PageBTW
			isLoading={isDefsLoading || isAsksLoading  || isRemainsDefsLoading}
			className=" "
		>
			<HeaderBlock
				className="bg-gradient-to-b  from-pink-700/50  to-pink-400 shadow-md shadow-pink-500 "
			>
				Дефіцити
			</HeaderBlock>

			<ModalCreateAsk
				artikul={newAskArtikul}
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
			/>

			<ButtonGroup>
				<ButtonGroup.Navigation
				className="grid grid-cols-2 gap-2"
				>

					<ButtonBlock
						className={` ${isMorning ? 'pink-b-n' : 'pink-b'}   `}
						onClick={() => setIsMorning(true)}
					>
					<MdSunnySnowing size={24} color='' />	Ранок
					</ButtonBlock>

					<ButtonBlock
						className={` ${isMorning ? 'pink-b' : 'pink-b-n'}   `}
						onClick={() => setIsMorning(false)}
					>
						<MdSunny size={24} color='' />Актуальні
					</ButtonBlock>
				</ButtonGroup.Navigation>
				<ButtonGroup.Actions>
					<ButtonBlock
						className="sky-b"
						onClick={() => setIsShowModalCalculate(true)}
					>
						<CalculateIcon size={24} />	Порахувати
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>







			{isShowModalCalculate &&
				<ModalConfirm
					ask={`Порахувати дефіцити поза розписом?
						Це займе декілька хвилин. `}
					onConfirm={handleCalculateDefsOutOfSchedule}
					onCancel={() => setIsShowModalCalculate(false)}
					isConfirming={false}
				/>}










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

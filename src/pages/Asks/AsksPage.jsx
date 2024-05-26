import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock,  PageBTW, Spinner } from "../../components"
import useAskStore from './stores/asksStore'

import { AddIcon } from '../../components/UI/Icons';

import ModalCreateAsk from './components/modals/ModalCreateAsk';

import useFetchAsks from './hooks/useFetchAsks';
import AsksContainer from './components/AsksContainer';


export default function AsksPage() {

	const { isAsksLoading } = useFetchAsks()

	const { asks } = useAskStore()

	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)


	if (isAsksLoading) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent bg-gradient-to-b from-slate-700/50 to-slate-800/50"
				>
					Запити
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(99 102 241)" />
				</ContainerBlock>

			</PageBTW>
		)
	}


	return (
		<PageBTW
			className="space-y-4 px-1 "
		>
			<HeaderBlock
				className="bg-indigo-500 shadow-lg shadow-indigo-500"
			>
				Запити
			</HeaderBlock>


			{/* BUTTONS */}

			<ButtonGroup>
				<ButtonGroup.Actions>
					<ButtonBlock
						className="indigo-b  "
						onClick={() => setShowModalCreateAsk(true)}
					>
						<AddIcon />
						Створити запит
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>

			{/* MODALS */}


			<ModalCreateAsk
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
			/>

			<AsksContainer
				isAsksLoading={isAsksLoading}
				asks={asks}
			/>

		</PageBTW>
	)
}

import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner } from "../../components"
import useAskStore from './stores/asksStore'

import { AddIcon } from '../../components/UI/Icons';

import ModalCreateAsk from './components/modals/ModalCreateAsk';

import useFetchAsks from './hooks/useFetchAsks';
import AsksContainer from './components/AsksContainer';


export default function AsksPage() {

	const { isAsksLoading } = useFetchAsks()

	const { asks } = useAskStore()

	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)




	return (
		<PageBTW
			isLoading={isAsksLoading}
			className="  "
		>
			<HeaderBlock
				className="bg-indigo-500 shadow-sm shadow-indigo-500"
			>
				Запити
			</HeaderBlock>


			{/* BUTTONS */}

			<ButtonGroup>

				<ButtonGroup.Navigation></ButtonGroup.Navigation>

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

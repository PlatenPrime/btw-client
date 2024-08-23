import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner } from "../../components"

import { AddIcon } from '../../components/UI/Icons';

import ModalCreateAsk from './components/modals/ModalCreateAsk';

import useFetchAsks from './hooks/useFetchAsks';

import useFetchAllPoses from '../Poses/hooks/useFetchAllPoses'


import AsksContainer from './components/AsksContainer';


export default function AsksPage() {

	const {asks, isAsksLoading } = useFetchAsks()



	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)




	return (
		<PageBTW
			isLoading={isAsksLoading}
			className="  "
		>
			<HeaderBlock
				  className="bg-gradient-to-b  from-indigo-700/50  to-indigo-400 shadow-md shadow-indigo-500 "
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

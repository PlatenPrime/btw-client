import React from 'react'
import { CardBlock, InputBlock, ModalWrapper, TextBlock, ButtonBlock, Spinner } from '../../../../components'
import { LiaPalletSolid } from 'react-icons/lia'
import { BsBalloon, BsBoxSeam } from 'react-icons/bs'

export default function UpdateASkModal(

	{
		showModalUpdateAsk,
		setShowModalUpdateAsk,
		selectedPos,
		finalValuePosBoxes,
		finalValuePosQuant,
		askValuePosBoxes,
		askValuePosQuant,
		setAskValuePosBoxes,
		setFinalValuePosBoxes,
		setAskValuePosQuant,
		setFinalValuePosQuant,
		handleAskingPos,
		isUpdatingPos
	}

) {






	return (
		<>
			{showModalUpdateAsk && <ModalWrapper
				onCancel={() => setShowModalUpdateAsk(false)}
				title={`Зняття позиції з палети ${selectedPos?.palletTitle} `}

			>
				<CardBlock
					className="space-y-4  p-3 w-full flex flex-col justify-center  "
				>







					<CardBlock
						className="flex space-x-8 w-full"
					>
						<TextBlock
							className="text-2xl"
						>
							Зараз:
						</TextBlock>

						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className="text-sky-300  text-xl">
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className="text-sky-300  font-bold text-3xl  rounded"
							>

								{selectedPos?.quant}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className="text-amber-300  text-xl">
								<BsBoxSeam />
							</TextBlock>
							<TextBlock
								className="text-amber-300 font-bold text-3xl rounded"
							>
								{selectedPos?.boxes}
							</TextBlock>
						</CardBlock>


					</CardBlock>


					<CardBlock
						className="flex space-x-8 space-between w-full"
					>


						<TextBlock
							className="text-2xl "
						>
							Стане:
						</TextBlock>



						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-500  text-xl" : "text-teal-300  text-xl"}>
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-500  text-3xl" : "text-teal-300  text-3xl"}
							>

								{finalValuePosQuant}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className={finalValuePosBoxes < 0 ? "text-red-500  text-xl" : "text-teal-300  text-xl"}>


								<BsBoxSeam />
							</TextBlock>
							<TextBlock

								className={finalValuePosBoxes < 0 ? "text-red-500  text-3xl" : "text-teal-300  text-3xl"}>

								{finalValuePosBoxes}
							</TextBlock>
						</CardBlock>





					</CardBlock>


					<CardBlock>

						{finalValuePosBoxes < 0 && <TextBlock
							className="border border-red-600 text-red-600 p-2 rounded"
						>
							Коробки в мінусі
						</TextBlock>}

					</CardBlock>

					<CardBlock>

						{finalValuePosQuant < 0 && <TextBlock
							className="border border-red-500 text-red-500 p-2 rounded"
						>
							Недостатньо позиції
						</TextBlock>}

					</CardBlock>



					<CardBlock
						className="space-y-2"

					>


						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-sky-100   text-3xl">
								<BsBalloon />
							</TextBlock>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosQuant}
								onChange={(e) => {
									setAskValuePosQuant(e.target.value)
									setFinalValuePosQuant(selectedPos?.quant - e.target.value)
								}}
							/>
						</CardBlock>

						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-amber-100  text-3xl">
								<BsBoxSeam />
							</TextBlock>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosBoxes}
								onChange={(e) => {
									setAskValuePosBoxes(e.target.value)
									setFinalValuePosBoxes(selectedPos?.boxes - e.target.value)
								}}
							/>
						</CardBlock>









					</CardBlock>
















					<CardBlock
						className="grid grid-cols-2 space-x-2"
					>

						<ButtonBlock
							className="red-b"
							onClick={() => setShowModalUpdateAsk(false)}
						>
							Скасувати
						</ButtonBlock>

						<ButtonBlock
							className="green-b"
							disabled={finalValuePosQuant < 0 ||
								finalValuePosBoxes < 0 ||
								askValuePosQuant <= 0 ||
								askValuePosBoxes < 0
							}
							onClick={handleAskingPos}
						>


							{isUpdatingPos ?
								<CardBlock>
									<Spinner color="rgb(134 239 172)" />
								</CardBlock>
								:
								<TextBlock>
									Зняти
								</TextBlock>}


						</ButtonBlock>



					</CardBlock>








				</CardBlock>
			</ModalWrapper>}
		</>
	)
}

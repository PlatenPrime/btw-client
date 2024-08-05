import React from 'react'
import { CardBlock, InputBlock, ModalWrapper, TextBlock, ButtonBlock, Spinner } from '../../../../components'

import { BsBalloon, BsBoxSeam } from 'react-icons/bs'
import { CancelIcon, DoneIcon } from '../../../../components/UI/Icons'

export default function ModalUpdateAsk(

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
					className="gap-2  p-2 grid  "
				>







					<CardBlock
						className="grid grid-cols-3 border border-yellow-500 rounded-xl"
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
								<BsBalloon size={12} />
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
								<BsBoxSeam size={12} />
							</TextBlock>
							<TextBlock
								className="text-amber-300 font-bold text-3xl rounded"
							>
								{selectedPos?.boxes}
							</TextBlock>
						</CardBlock>


					</CardBlock>


					<CardBlock
						className="grid grid-cols-3 border border-green-500 rounded-xl"
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
								<BsBalloon size={12} />
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


								<BsBoxSeam size={12} />
							</TextBlock>
							<TextBlock

								className={finalValuePosBoxes < 0 ? "text-red-500  text-3xl" : "text-teal-300  text-3xl"}>

								{finalValuePosBoxes}
							</TextBlock>
						</CardBlock>





					</CardBlock>




					{finalValuePosBoxes < 0 && <TextBlock
						className="border border-red-600 text-red-600 p-2 rounded"
					>
						Коробки в мінусі
					</TextBlock>}





					{finalValuePosQuant < 0 && <TextBlock
						className="border border-red-500 text-red-500 p-2 rounded"
					>
						Недостатньо позиції
					</TextBlock>}





					<CardBlock
						className="space-y-2"

					>


						<CardBlock className="flex justify-between items-center gap-2">
							<TextBlock
								className="text-sky-100   text-3xl">
								<BsBalloon />
							</TextBlock>
							<InputBlock
							className="text-xl"
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

						<CardBlock className="flex justify-between items-center gap-2">
							<TextBlock
								className="text-amber-100  text-3xl">
								<BsBoxSeam />
							</TextBlock>
							<InputBlock
							className="text-xl"
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
						className="grid grid-cols-2 "
					>

						<ButtonBlock
							className="red-b "
							onClick={() => setShowModalUpdateAsk(false)}
						>
							<CancelIcon />	Скасувати
						</ButtonBlock>

						<ButtonBlock
							className="green-b "
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
									<DoneIcon />	Зняти
								</TextBlock>}


						</ButtonBlock>



					</CardBlock>








				</CardBlock>
			</ModalWrapper>}
		</>
	)
}

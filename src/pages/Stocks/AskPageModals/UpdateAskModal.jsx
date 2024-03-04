import React from 'react'
import { CardBlock, InputBlock, ModalWrapper, TextBlock } from '../../../components'
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
				title="Зняття позицій"

			>
				<CardBlock
					className="space-y-4 border p-3"
				>




					<CardBlock
						className="flex justify-center  font-bold "
					>

						<TextBlock
							className="text-indigo-300 text-3xl"
						>
							<LiaPalletSolid />
						</TextBlock>


						<TextBlock
							className="lg:min-w-1/3 text-3xl  lg:justify-items-start items-center text-indigo-300"
						>
							{selectedPos?.palletTitle}
						</TextBlock>

					</CardBlock>


					<CardBlock
						className="flex space-x-2"
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
								className="text-amber-300  text-3xl">
								<BsBoxSeam />
							</TextBlock>
							<TextBlock
								className="text-amber-300 font-bold text-2xl rounded"
							>
								{selectedPos?.boxes}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className="text-sky-300  text-3xl">
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className="text-sky-300  font-bold text-2xl  rounded"
							>

								{selectedPos?.quant}
							</TextBlock>
						</CardBlock>


					</CardBlock>


					<CardBlock
						className="flex space-x-2"
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
								className={finalValuePosBoxes < 0 ? "text-red-600  text-3xl" : "text-teal-300  text-3xl"}>


								<BsBoxSeam />
							</TextBlock>
							<TextBlock

								className={finalValuePosBoxes < 0 ? "text-red-600  text-2xl" : "text-teal-300  text-2xl"}>

								{finalValuePosBoxes}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-600  text-3xl" : "text-teal-300  text-3xl"}>
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-600  text-2xl" : "text-teal-300  text-2xl"}
							>

								{finalValuePosQuant}
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
							className="border border-red-600 text-red-600 p-2 rounded"
						>
							Недостатньо позиції
						</TextBlock>}

					</CardBlock>



					<CardBlock
						className="space-y-2"

					>


						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-cyan-500  text-3xl">
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




						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-cyan-500   text-3xl">
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


import { useRef, useState } from "react";
import { ButtonBlock, InputBlock, Spinner, TextBlock } from "../../index";
import { CancelIcon, OkIcon } from "../Icons";

export default function ModalEditOneValue({ value, onConfirm, onCancel, isUpdating }) {


	const [newValue, setNewValue] = useState(value)

	const modalRef = useRef();

	const handleModalClick = (e) => {
		// Проверяем, был ли клик по внешней области модального окна
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onCancel();
		}
	};

	return (
		<div
			className="fixed bg-sky-500/10 inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-opacity-60"
			onClick={handleModalClick}
		>

			<div className="relative flex flex-col space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-80 min-w-fit  max-w-3xl rounded-lg shadow-lg p-8"
				ref={modalRef}
			>




				<InputBlock
					placeholder="Введи нове значення..."
					value={newValue}
					onChange={(e) => { setNewValue(e.target.value) }}
					className="text-center text-xl"


				/>


				<div className="grid grid-cols-2 space-x-2">
					<ButtonBlock
						className="red-b flex justify-center items-center"
						onClick={() => { onCancel(); }}
					>
						<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
						<TextBlock className=""> Скасувати</TextBlock>

					</ButtonBlock>
					<ButtonBlock
						onClick={() => onConfirm(newValue)}
						className="green-b flex justify-center items-center"
						disabled={newValue?.length < 1}
					>
						{isUpdating ?
							<Spinner color="rgb(134 239 172)" />
							:
							<>	<TextBlock className="text-2xl"><OkIcon /></TextBlock>
								<TextBlock className=""> 	Змінити</TextBlock></>
						}

					</ButtonBlock>

				</div>
			</div>
		</div>
	)
}

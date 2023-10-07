
import { useRef, useState } from "react";
import { ButtonBlock, InputBlock, TextBlock } from "../../index";


export default function ModalCreate({ title, onConfirm, onCancel }) {


	const [newValue, setNewValue] = useState("")

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

			<div className="relative bg-sky-700/80 border border-sky-500 min-w-fit  max-w-2xl p-6 rounded-lg shadow-lg
			space-y-4 flex flex-col 
			"
				ref={modalRef}
			>

				<TextBlock
					className="text-3xl"
				>{title}</TextBlock>


				<InputBlock
					placeholder="Введи название..."
					value={newValue}
					onChange={(e) => { setNewValue(e.target.value) }}
					className="text-2xl text-center mx-auto"


				/>


				<div className="flex justify-evenly">
					<ButtonBlock
						onClick={() => onConfirm(newValue)}
						className="success-c "
						disabled={!newValue}
					>
						Подтвердить
					</ButtonBlock>
					<ButtonBlock
						onClick={() => onCancel()}
						className="cancel-c "
					>
						Отмена
					</ButtonBlock>
				</div>
			</div>
		</div>
	)
}

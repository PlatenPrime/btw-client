
import { useRef, useState } from "react";
import ButtonBlock from "../../blocks/ButtonBlock";
import InputBlock from "../../blocks/InputBlock";
import TextBlock from "../../blocks/TextBlock";

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

			<div className="relative bg-sky-500/50 border border-sky-500 min-w-fit  max-w-2xl p-6 rounded-lg shadow-lg"
				ref={modalRef}
			>

				<TextBlock>{title}</TextBlock>


				<InputBlock
					placeholder="Введи значение..."
					value={newValue}
					onChange={(e) => { setNewValue(e.target.value) }}


				/>


				<div className="flex justify-evenly">
					<ButtonBlock
						onClick={() => onConfirm(newValue)}
						className="success-c px-4"
					>
						Подтвердить
					</ButtonBlock>
					<ButtonBlock
						onClick={() => onCancel()}
						className="cancel-c px-4"
					>
						Отмена
					</ButtonBlock>
				</div>
			</div>
		</div>
	)
}

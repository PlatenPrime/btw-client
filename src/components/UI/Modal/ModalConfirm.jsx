import { useRef } from "react";
import {ButtonBlock, TextBlock  } from "../../../components";






export default function ModalConfirm({ ask, onConfirm, onCancel }) {

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

			<div className="relative space-y-8 bg-sky-700/80 border border-sky-500 min-w-fit  max-w-2xl p-4 rounded-lg shadow-lg"
				ref={modalRef}
			>


				<TextBlock
					className="text-3xl font-semibold mb-4 "

				>{ask}
				</TextBlock>

				<div className="flex justify-evenly  ">
					<ButtonBlock
						onClick={() => onConfirm()}
						className="success-c px-4 text-2xl w-1/3"
					>
						Да
					</ButtonBlock>
					<ButtonBlock
						onClick={() => onCancel()}
						className="cancel-c px-4 text-2xl w-1/3"
					>
						Нет
					</ButtonBlock>
				</div>
			</div>

		</div>

	);
}
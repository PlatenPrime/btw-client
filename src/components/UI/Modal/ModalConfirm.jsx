import { useRef } from "react";
import { ButtonBlock, TextBlock } from "../../../components";






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

			<div className="relative space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-80 min-w-fit  max-w-3xl p-4 rounded-lg shadow-lg"
				ref={modalRef}
			>


				<TextBlock
					className="text-2xl font-semibold mb-4 "

				>{ask}
				</TextBlock>

				<div className="flex justify-evenly  ">

					<ButtonBlock
						onClick={() => onCancel()}
						className=" red-b px-4 text-xl w-1/3"
					>
						Ні
					</ButtonBlock>

					<ButtonBlock
						onClick={() => onConfirm()}
						className=" green-b px-4 text-xl w-1/3"
					>
						Так
					</ButtonBlock>

				</div>
			</div>

		</div>

	);
}
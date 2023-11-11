import { useRef } from "react";
import { ButtonBlock, TextBlock } from "../../../components";






export default function ModalDelete({ ask, onDelete, onCancel }) {

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

				<div className="grid grid-cols-2 space-x-2">

					<ButtonBlock
						onClick={() => onCancel()}
						className=" red-b px-4 text-xl"
					>
						Ні
					</ButtonBlock>

					<ButtonBlock
						onClick={() => onDelete()}
						className=" green-b px-4 text-xl "
					>
						Так
					</ButtonBlock>

				</div>
			</div>

		</div>

	);
}
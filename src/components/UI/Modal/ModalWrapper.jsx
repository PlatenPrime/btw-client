import { useRef } from "react";
import { ButtonBlock, RowBlock, TextBlock } from "../../../components";



export default function ModalWrapper({ children, onCancel }) {

	const modalRef = useRef();

	const handleModalClick = (e) => {
		// Проверяем, был ли клик по внешней области модального окна
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onCancel();
		}
	};


	return (
		<div
			className="fixed p-2 bg-sky-500/10 inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-opacity-60"
			onClick={handleModalClick}
		>




			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-full">


				<div className="relative space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-80 min-w-fit  max-w-2xl p-4 rounded-lg shadow-lg"
					ref={modalRef}
				>

					<RowBlock
						className="flex justify-end"
					>
						<ButtonBlock
							onClick={() => onCancel()}
							className="cancel-c px-2 text-md "
						>
							Закрыть
						</ButtonBlock>
					</RowBlock>

					{children}
				</div>


			</div>



		</div>

	);
}

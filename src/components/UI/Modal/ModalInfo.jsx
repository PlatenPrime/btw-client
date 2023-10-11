import { useRef } from "react";
import { ButtonBlock, RowBlock, TextBlock } from "../../../components";
import { AiOutlineClose } from "react-icons/ai";



export default function ModalInfo({ children, onCancel }) {

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

			<div className="relative space-y-8 bg-sky-900/90 border border-sky-500 min-w-fit  max-w-2xl p-4 rounded-lg shadow-lg"
				ref={modalRef}
			>


				<RowBlock
					className="flex justify-end"
				>
					<ButtonBlock
						onClick={() => onCancel()}
						className="cancel-c px-2 text-md "
					>
						<AiOutlineClose />
					
					</ButtonBlock>
				</RowBlock>



				{children}




			</div>

		</div>

	);
}

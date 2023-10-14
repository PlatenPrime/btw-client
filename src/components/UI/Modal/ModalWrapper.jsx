import { useRef } from "react";
import { ButtonBlock, RowBlock, TextBlock } from "../../../components";
import { AiOutlineClose } from "react-icons/ai";


export default function ModalWrapper({ children, onCancel, title }) {


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


				<div className="relative space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-90 min-w-fit  max-w-3xl p-4 rounded-lg shadow-lg"
					ref={modalRef}
				>

					<RowBlock
						className="flex justify-between bg-gray-800 p-1"
					>
						<TextBlock></TextBlock>

						<TextBlock
							className="text-white text-3xl"
						>{title}</TextBlock>

						<ButtonBlock
							onClick={() => onCancel()}
							className="cancel-c px-2 text-md rounded-full"
						>
							<AiOutlineClose />
						</ButtonBlock>
					</RowBlock>

					{children}
				</div>


			</div>



		</div>

	);
}

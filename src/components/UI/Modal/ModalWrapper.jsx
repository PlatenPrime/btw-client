import { useRef } from "react";
import { ButtonBlock, RowBlock, TextBlock } from "../../../components";
import { AiOutlineClose } from "react-icons/ai";
import { CancelIcon } from "../Icons";


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
			className="fixed  overflow-auto p-2 bg-sky-500/10 inset-0 z-40 flex items-center justify-center backdrop-blur backdrop-filter "
			onClick={handleModalClick}
		>




			<div className=" overflow-y-auto max-h-full   w-fit  ">


				<div className="relative  space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-90 min-w-fit  max-w-3xl p-4 rounded-lg shadow-lg  "
					ref={modalRef}
				>

					<RowBlock
						className="flex justify-center  px-6  "
					>


						<TextBlock
							className="text-white bg-slate-700  text-2xl  rounded-xl p-1  "
						>
							{title}
						</TextBlock>

						<ButtonBlock
							onClick={() => onCancel()}
							className="red-b  text-xl rounded-full absolute  right-0"
						>
							<CancelIcon size={24} />
						</ButtonBlock>
					</RowBlock>

					{children}
				</div>


			</div>



		</div>

	);
}

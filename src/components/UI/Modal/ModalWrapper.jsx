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
			className="fixed  overflow-auto p-2 bg-sky-500/10 inset-0 z-40 flex items-center justify-center backdrop-blur backdrop-filter bg-opacity-60"
			onClick={handleModalClick}
		>




			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-full  ">


				<div className="relative space-y-8 bg-slate-900 backdrop-blur backdrop-filter bg-opacity-90 min-w-fit  max-w-3xl p-4 rounded-lg shadow-lg  "
					ref={modalRef}
				>

					<RowBlock
						className="flex justify-center  px-6 bg-slate-700 rounded-xl "
					>


						<TextBlock
							className="text-white  text-2xl  rounded p-1  "
						>
							{title}
						</TextBlock>

						{/* <ButtonBlock
							onClick={() => onCancel()}
							className="red-b px-2 text-md rounded-full absolute top-1 right-1"
						>
							<AiOutlineClose />
						</ButtonBlock> */}
					</RowBlock>

					{children}
				</div>


			</div>



		</div>

	);
}

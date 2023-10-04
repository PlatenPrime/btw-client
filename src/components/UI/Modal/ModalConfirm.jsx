import { useRef } from "react";





function Modal(ask, onConfirm, onCancel) {

	const modalRef = useRef();

	const handleModalClick = (e) => {
		// Проверяем, был ли клик по внешней области модального окна
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			props.onCancel();
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


				<p className="text-lg font-semibold mb-4">{ask}</p>
				<div className="flex justify-evenly">
					<ButtonBlock
						onClick={onConfirm}
						className="success-c px-4"
					>
						Да
					</ButtonBlock>
					<ButtonBlock
						onClick={onCancel}
						className="cancel-c px-4"
					>
						Нет
					</ButtonBlock>
				</div>
			</div>
		</div>

	);
}
import React from 'react';
import { ModalEditOneValue } from '../../../components';

function ModalChangePalletCom({ show, onCancel, value, onConfirm }) {
	return (
		show && (
			<ModalEditOneValue
				value={value}
				onConfirm={onConfirm}
				onCancel={onCancel}

			/>
		)
	);
}

export default ModalChangePalletCom;
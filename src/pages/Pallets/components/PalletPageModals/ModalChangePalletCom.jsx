import React from 'react';
import { ModalEditOneValue } from '../../../../components';

function ModalChangePalletCom({ show, onCancel, value, onConfirm, isChangingPalletCom }) {
	return (
		show && (
			<ModalEditOneValue
				value={value}
				onConfirm={onConfirm}
				onCancel={onCancel}
				isUpdating={isChangingPalletCom}
			/>
		)
	);
}

export default ModalChangePalletCom;
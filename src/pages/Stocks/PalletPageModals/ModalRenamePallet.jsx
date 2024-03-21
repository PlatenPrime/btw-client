import React from 'react';
import { ModalEditOneValue } from '../../../components';

function ModalRenamePallet({ show, onCancel, value, onConfirm, isRenamingPallet }) {
	return (
		show && (
			<ModalEditOneValue
				value={value}
				onConfirm={onConfirm}
				onCancel={onCancel}
				isUpdating={isRenamingPallet}
			/>
		)
	);
}

export default ModalRenamePallet;

import React from 'react';
import { ModalDelete } from '../../../components';

function ModalDeletePallet({ show, onCancel, onDelete, isDeletingPallet }) {
	return (
		show && (
			<ModalDelete
				ask="Видалити цю палету?"
				onDelete={onDelete}
				onCancel={onCancel}
				isDeleting={isDeletingPallet}
			/>
		)
	);
}

export default ModalDeletePallet;

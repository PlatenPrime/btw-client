
import React from 'react';
import { ModalDelete } from '../../../components';

function ModalDeletePallet({ show, onCancel, onDelete }) {
	return (
		show && (
			<ModalDelete
				ask="Видалити цю палету?"
				onDelete={onDelete}
				onCancel={onCancel}
			/>
		)
	);
}

export default ModalDeletePallet;

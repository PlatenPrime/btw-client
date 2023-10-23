import React from 'react';
import { ModalDelete } from '../../../components';

function ModalDeletePos({ show, onCancel, onDelete, selectedPos }) {
	return (
		show && (
			<ModalDelete
				ask={`Видалити позицію "${selectedPos.artikul}" ?`}
				onDelete={onDelete}
				onCancel={onCancel}
			/>
		)
	);
}

export default ModalDeletePos;

import React from 'react';
import { ModalDelete } from '../../../../components';

function ModalDeletePos({ show, onCancel, onDelete, selectedPos, isDeletingPos }) {
	return (
		show && (
			<ModalDelete
				ask={`Видалити позицію "${selectedPos.artikul}" ?`}
				onDelete={onDelete}
				onCancel={onCancel}
				isDeleting={isDeletingPos}
			/>
		)
	);
}

export default ModalDeletePos;

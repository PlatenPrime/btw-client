import React from 'react'
import { ModalConfirm } from '../../../components'

export default function ModalClearPallet({
	show, ask, onConfirm, onCancel
}) {
	return (
		show && (<ModalConfirm
			ask={ask}
			onConfirm={onConfirm}
			onCancel={onCancel}

		/>)
	)
}

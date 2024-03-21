import React from 'react'
import { ModalConfirm } from '../../../components'

export default function ModalClearPallet({
	show, ask, onConfirm, onCancel, isClearingPallet
}) {
	return (
		show && (<ModalConfirm
			ask={ask}
			onConfirm={onConfirm}
			onCancel={onCancel}
			isConfirming={isClearingPallet}

		/>)
	)
}

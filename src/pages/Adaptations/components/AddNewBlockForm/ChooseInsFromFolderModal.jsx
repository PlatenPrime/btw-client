import React from 'react'
import { ModalWrapper } from '../../../../components'

export default function ChooseInsFromFolderModal({
    isShowChooseInsFromFolderModal,
    setIsShowChooseInsFromFolderModal
}) {


if (!isShowChooseInsFromFolderModal) return 


    return (
        <ModalWrapper
        title={"Choose instruction from folder"}
        onCancel={() => setIsShowChooseInsFromFolderModal(false)}
        >
            ChooseInsFromFolderModal
        </ModalWrapper>
    )
}

import React from 'react'
import { ModalWrapper } from '../../../../components'
import useCompStore from '../../stores/compStore'

export default function TransferCompVariantModal({
    isShowModalTransferCompVariant,
    setIsShowModalTransferCompVariant,
    compVariant,
    compStamp,

}) {

const {createComp, updateCompVariantById }  = useCompStore()




    if (!isShowModalTransferCompVariant) return


    return (
        <ModalWrapper
            title={`Перенесення варіанту ${compVariant?.artikul}`}
            onCancel={() => setIsShowModalTransferCompVariant(false)}
        >
            TransferCompVariantModal
        </ModalWrapper>
    )
}

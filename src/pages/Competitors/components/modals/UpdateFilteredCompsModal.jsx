import React, { useState } from 'react'
import { ModalConfirm } from '../../../../components'
import useCompStore from '../../stores/compStore'

export default function UpdateFilteredCompsModal({
    filteredComps,
    isShowModalUpdateFilteredComps,
    setIsShowModalUpdateFilteredComps
}) {


    const { getUpdatedFilteredComps } = useCompStore()


    const handleUpdateFilteredComps = async () => {
        try {
            setIsShowModalUpdateFilteredComps(false)
            await getUpdatedFilteredComps(filteredComps)
        } catch (error) {
            console.log(error);
        }
    }



    if (!filteredComps || filteredComps.length === 0 || !isShowModalUpdateFilteredComps) return null


    return (
        <ModalConfirm
            ask={`Проаналізувати відфільтровані артикули?
						Це займе декілька хвилин на сервері.  `}
            onConfirm={handleUpdateFilteredComps}
            onCancel={() => setIsShowModalUpdateFilteredComps(false)}
            isConfirming={false}
        />
    )
}

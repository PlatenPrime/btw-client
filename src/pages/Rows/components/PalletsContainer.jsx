import React from 'react'
import { ContainerBlock, Spinner, TextBlock } from '../../../components'
import PalletBage from './PalletBage'

export default function PalletsContainer({
    isRowPalletsLoading,
    rowPallets,
    allPoses,
    isAllPosesLoading
}) {





    if (isRowPalletsLoading || isAllPosesLoading) {
        return <ContainerBlock
            className="w-full  flex justify-center items-center"
        >

            <Spinner color="#fef3c7" />
        </ContainerBlock>
    }



    return (
        <ContainerBlock
            className="space-y-4  "
        >

            {
                rowPallets?.length === 0
                    ?
                    <TextBlock
                        className="text-2xl"
                    >
                        Цей ряд не містить палети
                    </TextBlock>
                    :
                    <>
                        {rowPallets?.map((pallet) => <PalletBage
                            pallet={pallet}
                            key={pallet._id}
                            poses={allPoses?.filter((pos) => pos.pallet === pallet._id)}
                        />
                        )}
                    </>}
        </ContainerBlock>
    )
}

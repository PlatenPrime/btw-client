import React from 'react'
import PosWithArtikulBage from './PosWithArtikulBage'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../components'

export default function PosesWithArtikulContainer({
    isLoadingPoses,
    posesWithArtikul,
    children

}) {


    if (isLoadingPoses) return <ContainerBlock
        className=" space-y-2"
    >
        <Spinner color="rgb(16 185 129)" />
    </ContainerBlock>




    if (posesWithArtikul?.length < 1) return <ContainerBlock
        className=" space-y-2"
    >
        <TextBlock
            className=" text-xl italic"
        >
            Позиції немає на запасах
        </TextBlock>
    </ContainerBlock>




    return (
        <ContainerBlock
            className=" space-y-2"
        >
            <CardBlock
                className="flex flex-col space-y-4 w-full"
            >
                {children}
            </CardBlock>

        </ContainerBlock>
    )
}


PosesWithArtikulContainer.PosWithArtikulBage = PosWithArtikulBage;
import React from 'react'
import PosWithArtikulBage from './PosWithArtikulBage'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../components'

export default function PosesWithArtikulContainer({
    isLoadingPoses,
    posesWithArtikul,
    children

}) {


    if (isLoadingPoses) return <ContainerBlock
        className=" "
    >
        <Spinner color="rgb(16 185 129)" />
    </ContainerBlock>




    if (posesWithArtikul?.length < 1) return <ContainerBlock
        className=" "
    >
        <TextBlock
            className=" text-xl italic"
        >
            Позиції немає на запасах
        </TextBlock>
    </ContainerBlock>




    return (
        <ContainerBlock
            className=" gap-2"
        >
            <CardBlock
                className="grid gap-2 "
            >
                {children}
            </CardBlock>

        </ContainerBlock>
    )
}


PosesWithArtikulContainer.PosWithArtikulBage = PosWithArtikulBage;
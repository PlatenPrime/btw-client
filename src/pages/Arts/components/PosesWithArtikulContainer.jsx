import React from 'react'
import PosWithArtikulBage from './PosWithArtikulBage'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../components'

export default function PosesWithArtikulContainer({
    isLoadingPoses,
    posesWithArtikul,
    children

}) {
    return (
        <ContainerBlock
            className=" space-y-2"
        >

            {isLoadingPoses ?
                <Spinner color="rgb(16 185 129)" />
                :
                posesWithArtikul.length > 0 ?
                    <CardBlock
                        className="flex flex-col space-y-4 w-full"
                    >
                        {children}
                    </CardBlock>
                    :
                    <TextBlock
                        className="text-emerald-100 text-xl italic"
                    >
                        Позиції немає на запасах
                    </TextBlock>


            }

        </ContainerBlock>
    )
}


PosesWithArtikulContainer.PosWithArtikulBage = PosWithArtikulBage;
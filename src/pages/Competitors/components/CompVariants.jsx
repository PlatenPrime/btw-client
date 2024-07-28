import React from 'react'
import { ContainerBlock, TextBlock } from '../../../components'
import CompVariantBage from './CompVariantBage'

export default function CompVariants({
    compVariants
}) {

    console.log(compVariants);






    return (
        <ContainerBlock
            className="grid gap-2"
        >

            <TextBlock
            className="text-5xl text-rose-600"
            >У РОЗРОБЦІ</TextBlock>

            {compVariants?.map(compVariant => (
                <CompVariantBage
                    key={compVariant?._id}
                    compVariant={compVariant}
                />
            ))}
           
        </ContainerBlock>
    )
}

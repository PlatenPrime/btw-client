import React from 'react'
import { ContainerBlock, TextBlock} from '../../../../components'
import CompVariantBage from '../CompVariant/CompVariantBage'

export default function CompVariants({
    compVariants
}) {

    console.log(compVariants);






    return (
        <ContainerBlock
            className="grid gap-2"
        >

            {compVariants?.length < 1 && (
                <TextBlock
                    className="  italic"
                >
                    Варіантів немає
                </TextBlock>
            )}

            {compVariants?.map(compVariant => (
                <CompVariantBage
                    key={compVariant?._id}
                    compVariant={compVariant}
                />
            ))}
           
        </ContainerBlock>
    )
}

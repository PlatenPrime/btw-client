import React from 'react'
import { ContainerBlock} from '../../../../components'
import CompVariantBage from '../CompVariant/CompVariantBage'

export default function CompVariants({
    compVariants
}) {

    console.log(compVariants);






    return (
        <ContainerBlock
            className="grid gap-2"
        >

            {compVariants?.map(compVariant => (
                <CompVariantBage
                    key={compVariant?._id}
                    compVariant={compVariant}
                />
            ))}
           
        </ContainerBlock>
    )
}

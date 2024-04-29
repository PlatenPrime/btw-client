import React from 'react'
import { ContainerBlock, Spinner } from '../../../components'

export default function AdaptSpinnerContainer() {
    return (
        <ContainerBlock
            className="w-full h-full flex justify-start items-center"
        >
            <Spinner color="rgb(34 197 94)" />
        </ContainerBlock>
    )
}

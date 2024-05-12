import React from 'react'
import { CardBlock, ContainerBlock, TextBlock } from '../../../components'

export default function AskActions({
    ask
}) {




if (!ask || !ask?.actions || ask?.actions?.length < 1 ) return null


    return (
        <ContainerBlock>
            <TextBlock
                className="text-2xl text-green-100"
            >
                Історія змін
            </TextBlock>
            <CardBlock
                className="space-y-2 "
            >
                {ask?.actions?.map((action, i) => <TextBlock
                    key={i}
                    className="bg-green-500/10 p-2 text-white rounded-xl italic justify-start"

                >
                    {i + 1 + ". "}{action}
                </TextBlock>)}
            </CardBlock>
        </ContainerBlock>
    )
}

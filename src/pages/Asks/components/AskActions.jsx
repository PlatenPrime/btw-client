import React from 'react'
import { CardBlock, ContainerBlock, TextBlock } from '../../../components'

export default function AskActions({
    ask
}) {




if (!ask || !ask?.actions || ask?.actions?.length < 1 ) return null


    return (
        <ContainerBlock
        className="space-y-2 "
        >
    
          
                {ask?.actions?.map((action, i) => <TextBlock
                    key={i}
                    className="bg-gradient-to-b from-indigo-500 to-indigo-900/50 p-2 text-white rounded-xl italic justify-start"

                >
                    {i + 1 + ". "}{action}
                </TextBlock>)}
    
        </ContainerBlock>
    )
}

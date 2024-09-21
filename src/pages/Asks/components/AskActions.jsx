import React from 'react'
import { CardBlock, ContainerBlock, TextBlock } from '../../../components'

export default function AskActions({
    ask
}) {




if (!ask || !ask?.actions || ask?.actions?.length < 1 ) return null


    return (
        <ContainerBlock
        className="text-xs "
        >
    
          
                {ask?.actions?.map((action, i) => <TextBlock
                    key={i}
                    className=" p-2 text-white rounded-xl italic justify-start text-left"

                >
                    {i + 1 + ". "}{action}
                </TextBlock>)}
    
        </ContainerBlock>
    )
}

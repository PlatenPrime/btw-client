import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import InsCard from './InsCard'
import YoutubeCard from '../../../components/UI/YoutubeCard/YoutubeCard'
import InsBodyContainer from './InsBodyContainer'

export default function InsContainer({
    instruction,
    author,
    isInsEditing
}) {


    if (isInsEditing) return null

    return (

        <CardBlock
            className="p-1 space-y-4 "
        >

            <InsCard ins={instruction} author={author} />

            {instruction?.videoUrl &&

                <YoutubeCard url={instruction?.videoUrl} />

            }


            {instruction?.body
                ?
                <InsBodyContainer

                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: instruction?.body
                        }} >

                    </div>
                </InsBodyContainer>
                :
                <TextBlock className="text-xl italic text-slate-500"  >Текст інструкції відсутній</TextBlock>
            }

        </CardBlock>
    )
}

import React from 'react'
import { ContainerBlock, TextBlock } from '../../../components'
import YoutubeCard from '../../../components/UI/YoutubeCard/YoutubeCard'
import InsBodyContainer from '../../Instructions/components/InsBodyContainer'

export default function AdaptBlockIns({
    instruction
}) {
    return (
        <ContainerBlock
            className="space-y-4"
        >
            <TextBlock
                className="font-bold text-2xl w-full bg-blue-500 rounded-xl p-4"
            >

                {instruction?.title}
            </TextBlock>

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
        </ContainerBlock>
    )
}

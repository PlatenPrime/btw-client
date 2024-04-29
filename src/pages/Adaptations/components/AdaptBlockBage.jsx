import React from 'react'
import { CardBlock, TextBlock } from '../../../components'

export default function AdaptBlockBage({
    adaptBlock,
    i,
    instructions
}) {
    return (
        <CardBlock
            key={adaptBlock._id}
            className="  w-full rounded-3xl bg-green-500/20 p-2 space-y-4 "
        >
            <TextBlock
                className=" text-2xl w-full bg-green-500 rounded-xl"
            >
                {i + 1}. {adaptBlock?.title}
            </TextBlock>


            <CardBlock
                className="flex space-x-4"
            >

                <img
                    src={instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.titleImage
                        || 'https://placehold.co/600x400?text=Інструкція'
                    }
                    width={200}
                    className="rounded-3xl"
                >

                </img>

                <TextBlock
                    className=" text-xl"
                >



                    Інструкція: {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}


                </TextBlock>


            </CardBlock>

        </CardBlock>
    )
}

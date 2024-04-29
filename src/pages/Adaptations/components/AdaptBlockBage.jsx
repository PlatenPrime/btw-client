import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'

export default function AdaptBlockBage({
    adaptBlock,
    i,
    instructions,
    isAdaptEditing
}) {


    const navigate = useNavigate()



    return (
        <CardBlock
            onClick={!isAdaptEditing ? () => navigate(`/adapts/blocks/${adaptBlock._id}`) : null}
            key={adaptBlock._id}
            className="  w-full rounded-3xl bg-green-500/20 hover:bg-green-500/50 p-2 space-y-4 cursor-pointer "
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

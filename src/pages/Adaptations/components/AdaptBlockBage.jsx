import React from 'react'
import { ButtonBlock, CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'
import { MoveVertIcon } from '../../../components/UI/Icons'

import { Reorder, useDragControls } from 'framer-motion';

export default function AdaptBlockBage({
    adaptBlock,
    i,
    instructions,
    isAdaptEditing,
    user
}) {


    const navigate = useNavigate()

    const controls = useDragControls()


    return (

        <Reorder.Item
            value={adaptBlock}
            dragListener={false}
            dragControls={controls}
        >
            <CardBlock
                onClick={!isAdaptEditing ? () => navigate(`/adapts/blocks/${adaptBlock._id}`) : null}
                key={adaptBlock._id}
                className={` w-full my-4
            flex  justify-between items-center
            rounded-2xl  bg-gradient-to-b from-cyan-500/70 to-cyan-700/50  p-2 space-y-4 cursor-pointer 
            ${!isAdaptEditing && 'hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500'}
            
            `}
            >


                <CardBlock
                    className="flex items-center space-x-2"
                >

                    <TextBlock
                        className=" text-2xl   rounded-full p-6 "
                    >
                        {i + 1}
                    </TextBlock>


                    <CardBlock
                        className="flex space-x-4"
                    >

                        <img
                            src={instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.titleImage
                                || 'https://placehold.co/600x400?text=Інструкція'
                            }
                            width={150}
                            className="rounded-3xl"
                        >

                        </img>

                        <TextBlock
                            className=" text-2xl"
                        >
                            {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}
                        </TextBlock>


                    </CardBlock>
                </CardBlock>


                <TextBlock>Пройдено: {adaptBlock?.isDone[user?._id] ? 'Так' : 'Ні'}</TextBlock>

                <div
                    onPointerDown={(e) => controls.start(e)}
                >
                    {isAdaptEditing && <ButtonBlock
                        className="slate-b"

                    >
                        <MoveVertIcon size={40} />
                    </ButtonBlock>
                    }
                </div>




            </CardBlock>
        </Reorder.Item>

    )
}

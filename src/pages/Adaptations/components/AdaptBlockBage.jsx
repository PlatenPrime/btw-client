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
                className={`
                    
                    
                    w-full my-4
         
                    grid lg:grid-cols-4

            rounded-2xl  bg-gradient-to-b from-cyan-500/70 to-cyan-700/50  p-2 space-y-4 cursor-pointer 
            ${!isAdaptEditing && 'hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500'}
            
            `}
            >




                <CardBlock
                    className="col-span-2 flex flex-col lg:flex-row items-center gap-2 "
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
                        {i + 1}.  {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}
                    </TextBlock>


                </CardBlock>



                <CardBlock
                    className="col-span-2 grid lg:grid-cols-2 gap-2 "
                >


                    <TextBlock>Пройдено: {adaptBlock?.isDone[user?._id] ? 'Так' : 'Ні'}</TextBlock>

                    <div
                        onPointerDown={(e) => controls.start(e)}
                        className="flex items-center justify-center"
                    >
                        {isAdaptEditing && <ButtonBlock
                            className="blue-b  active:cursor-grabbing"

                        >
                            <MoveVertIcon size={40} color={'white'} />
                        </ButtonBlock>
                        }
                    </div>

                </CardBlock>


            </CardBlock>







        </Reorder.Item>

    )
}

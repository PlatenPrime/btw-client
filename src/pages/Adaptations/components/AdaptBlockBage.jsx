import React from 'react'
import { ButtonBlock, CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'
import { CancelIcon, DoneIcon, MoveVertIcon } from '../../../components/UI/Icons'

import { Reorder, useDragControls } from 'framer-motion';
import { MdCancelPresentation } from 'react-icons/md';
import { LuClock } from 'react-icons/lu';

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
                    grid lg:grid-cols-4 gap-2

            rounded-2xl  bg-slate-600/30  p-2 space-y-4 cursor-pointer 
            ${!isAdaptEditing && 'hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500'}
            transition duration-500 ease-in-out
            `}
            >




                <CardBlock
                    className="col-span-2 flex flex-row items-center gap-2 "
                >

                    <img
                        src={instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.titleImage
                            || 'https://placehold.co/600x400?text=Інструкція'
                        }
                        width={150}
                        className="rounded-xl"
                    >

                    </img>

                    <TextBlock
                        className=" text-xl text-left"
                    >
                        {i + 1}.  {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}
                    </TextBlock>


                </CardBlock>



                <CardBlock
                    className="col-span-2 grid grid-cols-2 gap-2 "
                >


                    <TextBlock
                    className="justify-self-center  "
                    >
                        {adaptBlock?.isDone[user?._id]
                            ?
                            <DoneIcon size={24}  />
                            :
                            <LuClock size={24}  />}
                    </TextBlock>

                    <div
                        onPointerDown={(e) => controls.start(e)}
                        className="flex items-center justify-center"
                    >
                        {isAdaptEditing && <ButtonBlock
                            className="cyan-b  active:cursor-grabbing w-full "

                        >
                            <MoveVertIcon size={24} color={'white'} />
                        </ButtonBlock>
                        }
                    </div>

                </CardBlock>


            </CardBlock>







        </Reorder.Item>

    )
}

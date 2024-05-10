import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { PalletIcon } from '../../../components/UI/Icons'
import { BsBalloon, BsBoxSeam } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa6'

export default function ArtPalletBage({
    pos,
    onClick
}) {


    return (
        <CardBlock
            className={`
        grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0 cursor-pointer p-4 lg:gap-8 justify-center rounded-xl
         
        transition ease-in-out duration-500
    
        ${pos?.quant === 0
                    ?
                    "bg-gradient-to-b from-gray-500/50 to-gray-700/50 hover:bg-gray-500/50  "
                    :
                    pos.sklad === "merezhi" ? "bg-gradient-to-b from-yellow-500/80 to-yellow-700/50 hover:bg-yellow-500/50  " :
                        pos.sklad === "pogrebi" ? "bg-gradient-to-b from-emerald-500/80 to-emerald-700/50 hover:bg-emerald-500/50   " :
                            ""
                }
    `}

            onClick={onClick}
            key={pos._id}
        >


            <TextBlock
                className="flex lg:justify-start   text-2xl"
            >
                <PalletIcon />
                <TextBlock>
                    {pos?.palletTitle}
                </TextBlock>
            </TextBlock>




            <CardBlock
                className=" grid grid-cols-2"
            >

                <TextBlock
                    className=" space-x-2"
                >
                    <FaWarehouse size={24} />
                    <span>{pos?.sklad === "pogrebi" ? "Погреби" : pos?.sklad === "merezhi" ? "Мережі" : ""}</span>
                </TextBlock>

                <TextBlock>
                    {pos?.date}

                </TextBlock>

                {pos?.com && <TextBlock
                    className="col-span-2 italic"
                >
                    {pos?.com}
                </TextBlock>
                }

            </CardBlock>




            <CardBlock
                className="  w-full flex justify-between "
            >

                <CardBlock
                    className="flex justify-center w-1/2 space-x-2"
                >
                    <TextBlock
                        className="  text-xl">
                        <BsBoxSeam size={12} />
                    </TextBlock>
                    <TextBlock
                        className=" font-bold text-xl rounded"
                    >
                        {pos?.boxes}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className="flex justify-center w-1/2 space-x-2"
                >
                    <TextBlock
                        className="  text-xl">
                        <BsBalloon size={12} />
                    </TextBlock>
                    <TextBlock
                        className="  font-bold text-xl  rounded"
                    >

                        {pos?.quant}
                    </TextBlock>
                </CardBlock>




            </CardBlock>

        </CardBlock>
    )
}

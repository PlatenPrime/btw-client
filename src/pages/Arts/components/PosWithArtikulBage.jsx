import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { PalletIcon } from '../../../components/UI/Icons'
import { BsBalloon, BsBoxSeam } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa6'

export default function ArtPalletBage({
    pos,
    onClick
}) {


    const skladStyleOptions = {
        "merezhi": "bg-gradient-to-b from-yellow-500/80 to-yellow-900/50 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500  ",
        "pogrebi": "bg-gradient-to-b from-emerald-500/80 to-emerald-900/50 hover:bg-emerald-500/50  hover:shadow-lg hover:shadow-emerald-500",
    }

    const skladOptions = {
        "merezhi": "Мережі",
        "pogrebi": "Погреби",
    }




    return (
        <CardBlock
            className={`
        grid grid-cols-1 lg:grid-cols-3 gap-2  cursor-pointer p-2  justify-center rounded-xl
         
        transition ease-in-out duration-500
    
        ${pos?.quant === 0
                    ?
                    "bg-gradient-to-b from-gray-500/20 to-gray-700/20 hover:bg-gray-900/20"
                    :
                    skladStyleOptions[pos?.sklad]
                }
    `}

            onClick={onClick}
            key={pos?._id}
        >


            <CardBlock
                className="grid grid-cols-2"
            >

                <TextBlock
                    className="flex lg:justify-start   text-lg"
                >
                    <PalletIcon />
                    <TextBlock>
                        {pos?.palletTitle}
                    </TextBlock>
                </TextBlock>



                <TextBlock
                    className=" gap-1"
                >
                    <FaWarehouse size={16} />
                    <span>{skladOptions[pos?.sklad]}</span>
                </TextBlock>

            </CardBlock>



          

                <CardBlock
                    className=" grid grid-cols-2 text-base"
                >
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
                className="  grid grid-cols-2 text-base  "
            >

                <CardBlock
                    className="flex justify-center  gap-1"
                >
                    <TextBlock
                        className="  ">
                        <BsBoxSeam size={12} />
                    </TextBlock>
                    <TextBlock
                        className=" font-bold  rounded"
                    >
                        {pos?.boxes}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className="flex justify-center  gap-1"
                >
                    <TextBlock
                        className="  ">
                        <BsBalloon size={12} />
                    </TextBlock>
                    <TextBlock
                        className="  font-bold  rounded"
                    >

                        {pos?.quant}
                    </TextBlock>
                </CardBlock>




            </CardBlock>

        </CardBlock>
    )
}

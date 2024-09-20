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
        "merezhi": "text-yellow-500",
        "pogrebi": "text-emerald-500",
    }

    const skladOptions = {
        "merezhi": "Мережі",
        "pogrebi": "Погреби",
    }




    return (
        <CardBlock
            className={`
        grid grid-cols-1 lg:grid-cols-3 gap-2  cursor-pointer p-2  justify-center rounded-xl
        bg-slate-600/10    hover:bg-slate-600/30
        transition ease-in-out duration-500
    
        ${pos?.quant === 0 && "grayscale" }
                    
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
                    <TextBlock
                    className={skladStyleOptions[pos?.sklad]}
                    >
                        {pos?.palletTitle}
                    </TextBlock>
                </TextBlock>



                <TextBlock
                    className={` gap-1 ${skladStyleOptions[pos?.sklad]}`}
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

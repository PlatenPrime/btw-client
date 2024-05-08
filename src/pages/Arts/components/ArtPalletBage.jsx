import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { PalletIcon } from '../../../components/UI/Icons'
import { BsBalloon, BsBoxSeam } from 'react-icons/bs'

export default function ArtPalletBage({
    pos,
    onClick
}) {


    return (
        <CardBlock
            className={`
										grid grid-cols-1 lg:grid-cols-2 space-y-2  lg:space-y-0 cursor-pointer p-4 lg:gap-8 justify-center rounded-xl
										${pos?.quant === 0 ? "bg-gray-700 hover:bg-gray-500 " : pos.sklad === "merezhi" ?
                    "bg-yellow-700/20 hover:bg-yellow-700/50  "
                    : pos.sklad === "pogrebi"
                        ? "bg-blue-700/20 hover:bg-blue-700/50 "
                        : null} 
										transition ease-in-out duration-300`}



            onClick={onClick}
          
            key={pos._id}
        >
            <TextBlock
                className="lg:w-1/2 flex  lg:justify-start text-2xl"
            >
                <PalletIcon />
                <TextBlock>
                    {pos?.palletTitle}
                </TextBlock>
            </TextBlock>






            <CardBlock
                className="  w-full flex justify-between "
            >

                <CardBlock
                    className="flex justify-center w-1/2 space-x-2"
                >
                    <TextBlock
                        className="text-amber-100  text-xl">
                        <BsBoxSeam />
                    </TextBlock>
                    <TextBlock
                        className="text-amber-100 font-bold text-xl rounded"
                    >
                        {pos?.boxes}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className="flex justify-center w-1/2 space-x-2"
                >
                    <TextBlock
                        className="text-sky-100  text-xl">
                        <BsBalloon />
                    </TextBlock>
                    <TextBlock
                        className="text-sky-100  font-bold text-xl  rounded"
                    >

                        {pos?.quant}
                    </TextBlock>
                </CardBlock>




            </CardBlock>

        </CardBlock>
    )
}

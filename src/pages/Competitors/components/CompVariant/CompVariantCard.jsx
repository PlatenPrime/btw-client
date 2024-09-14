import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../../components'
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { TbResize } from 'react-icons/tb';


export default function CompVariantCard({
    compVariant
}) {


    return (
        <ContainerBlock
            className="grid grid-cols-3  lg:grid-cols-6   gap-2 "
        >

            <CardBlock
            className=" lg:col-span-1 rounded-xl bg-white flex justify-center items-center"
            >
                <ImageArt
                    srcLink={compVariant?.imageUrl}
                    className=" rounded-xl"
                    size={100}
                />
            </CardBlock>

            <CardBlock
                className=" grid col-span-2 lg:col-span-4"
            >
                <TextBlock
                    className=" font-bold text-2xl"
                >
                    {compVariant?.artikul}
                </TextBlock>
                <TextBlock
                    className=" font-bold text-lg"
                >
                    {compVariant?.title}
                </TextBlock>
            </CardBlock>



            <CardBlock className=" col-span-3 lg:col-span-1 
        
            flex flex-col  items-center justify-center gap-2 w-full rounded-xl   text-sm p-2 ">
                <InfoItem icon={MdOutlinePrecisionManufacturing} text={compVariant?.prod} />
                <InfoItem icon={TbResize} text={compVariant?.size} />
            </CardBlock>


        </ContainerBlock>
    )
}



function InfoItem({ icon: Icon, text, className }) {
    return (
        <CardBlock className={`flex justify-between gap-1 min-w-fit w-full border-b  border-violet-500  px-1 rounded-none   ${className}  `}>
        <TextBlock className="text-xl text-violet-500" > <Icon /> </TextBlock>
        <TextBlock className="text-right" > {text} </TextBlock>
    </CardBlock>
    )

};
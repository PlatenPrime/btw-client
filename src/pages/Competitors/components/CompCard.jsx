import React from 'react'
import { CardBlock, ContainerBlock,  TextBlock } from '../../../components'
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { TbResize } from 'react-icons/tb';
import ArtBlock from '../../../components/UI/ArtBlock/ArtBlock';

export default function CompCard({
    comp
}) {


    return (
        <ContainerBlock
            className="grid grid-cols-3  lg:grid-cols-6   gap-2 "
        >

            <CardBlock
                className=" grid col-span-3 lg:col-span-5"
            >
                <ArtBlock artikul={comp?.artikul} />
            </CardBlock>


            <CardBlock className=" col-span-3 lg:col-span-1 
            bg-gradient-to-b from-fuchsia-500/50 to-fuchsia-900/50 
            flex flex-col  items-center justify-between gap-2 w-full rounded-xl   text-sm p-2 ">
                <InfoItem icon={MdOutlinePrecisionManufacturing} text={comp?.prod} />
                <InfoItem icon={MdOutlineCategory} text={comp?.category} />
                <InfoItem icon={BiCategory} text={comp?.subcategory} />
                <InfoItem icon={TbResize} text={comp?.size} />
            </CardBlock>


        </ContainerBlock>
    )
}



function InfoItem({ icon: Icon, text, className }) {
    return (
        <CardBlock className={`flex justify-between gap-1 min-w-fit w-full   px-1   ${className}  `}>
            <TextBlock className="text-xl" > <Icon /> </TextBlock>
            <TextBlock className="text-right" > {text} </TextBlock>
        </CardBlock>
    )

};
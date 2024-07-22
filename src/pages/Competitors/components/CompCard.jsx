import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../components'
import useFetchArts from '../../../hooks/useFetchArts';
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { TbResize } from 'react-icons/tb';

export default function CompCard({
    comp
}) {


    const { artsDB } = useFetchArts()





    return (
        <ContainerBlock
            className="grid grid-cols-3  lg:grid-cols-6   gap-2 "
        >

            <CardBlock
                className=" col-span-1
              lg:min-w-[100px] flex justify-center items-center 
                bg-white rounded-xl shadow-sm shadow-white 
                "
            >
                <CardBlock className="flex justify-center items-center  ">
                    <ImageArt size={100} artikul={comp?.artikul} className="rounded-xl  " />
                </CardBlock>


            </CardBlock>


            <TextBlock
                className=" col-span-2 lg:col-span-4
                w-full flex flex-col items-center justify-center px-2 
           bg-gradient-to-b from-sky-500/50 to-sky-700/50
           hover:shadow-sm hover:shadow-sky-500 hover:bg-sky-500
            cursor-pointer rounded-xl text-sm xs:text-xl sm:text-2xl  lg:text-3xl xl:text-4xl "

                onClick={() => {
                    const artId = artsDB?.find(art => art.artikul === comp?.artikul)?._id || "";
                    const url = `/arts/${artId}`;
                    window.open(url, "_blank");
                }}
            >
                {comp?.nameukr}
            </TextBlock>

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
            <TextBlock> <Icon /> </TextBlock>
            <TextBlock className="text-right" > {text} </TextBlock>
        </CardBlock>
    )

};
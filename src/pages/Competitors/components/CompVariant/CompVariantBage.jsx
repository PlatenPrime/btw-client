import React from 'react'
import { CardBlock, ImageArt, TextBlock } from '../../../../components';

export default function CompVariantBage({
    compVariant
}) {
    return (
        <div
            className="
            flex flex-row items-stretch gap-2 w-full
            lg:text-xl
        hover:shadow-2xl  hover:shadow-violet-500  
         bg-slate-600/30  hover:bg-violet-500 
         rounded-2xl cursor-pointer
        transition-all ease-in-out duration-500	
        ">
            <CardBlock
                className="bg-white rounded-l-xl flex items-center justify-center shrink-0 p-2"
            >
                <ImageArt
                    size={50}
                    artikul={compVariant?.artikul}
                    className="rounded-l-xl"
                    srcLink={compVariant?.imageUrl}
                />
            </CardBlock>



            <TextBlock
                onClick={() => {
                    window.open(`/comps/variants/${compVariant?._id}`, "_blank");
                }}
                className="flex items-center justify-start w-full text-left gap-2"
            >

                <span className="font-bold" >{compVariant?.artikul}</span>
                <span>{compVariant?.title}</span>

            </TextBlock>




        </div>
    )
}
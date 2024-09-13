import React from 'react'
import { CardBlock, ImageArt, TextBlock } from '../../../../components';

export default function CompBage({

    comp
}) {
    return (
        <div


            className="
            flex flex-row items-stretch gap-2 w-full
            lg:text-xl
        hover:shadow-2xl   hover:shadow-fuchsia-500 
      bg-slate-600/30  hover:bg-fuchsia-500  
         rounded-2xl cursor-pointer
        transition-all ease-in-out duration-500	
        ">


            <CardBlock
                className="bg-white rounded-l-xl flex items-center justify-center shrink-0 p-2"
            >
                <ImageArt size={50} artikul={comp?.artikul} className="rounded-l-xl" />
            </CardBlock>




            <TextBlock
                onClick={() => {
                    window.open(`/comps/${comp?._id}`, "_blank");
                }}
                className="flex items-center justify-start w-full text-left text-base"
            >
                {comp?.nameukr}
            </TextBlock>




        </div>
    )
}

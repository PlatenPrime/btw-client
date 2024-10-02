import React from 'react'
import { CardBlock, ImageArt, TextBlock } from '../../../../components';
import { Link } from 'react-router-dom';

export default function CompVariantBage({
    compVariant
}) {
    return (
        <CardBlock
            className="
           grid grid-cols-[100px_1fr] gap-2



        hover:shadow-2xl  hover:shadow-violet-500  
         bg-slate-600/30  hover:bg-violet-500 
         rounded-2xl cursor-pointer
        transition-all ease-in-out duration-500	
        "


        >
            <CardBlock
                className="bg-white rounded-l-xl flex items-center justify-center shrink-0 p-2 "
                onClick={(e) => e.stopPropagation()}
            >
                <ImageArt
                    size={100}
                    artikul={compVariant?.artikul}
                    className="rounded-l-xl"
                    srcLink={compVariant?.imageUrl}
                />
            </CardBlock>


            <Link
                className="grid gap-2 group "
                to={`/comps/variants/${compVariant?._id}`}
            >
                <TextBlock
                    className="flex flex-col items-start justify-center w-full text-left gap-2  "
                >

                    <span className="font-bold  text-violet-300  group-hover:text-violet-100 transition-all ease-in-out duration-500" >{compVariant?.artikul}</span>
                    <span>{compVariant?.title}</span>

                </TextBlock>

                <TextBlock
                    className="flex items-center justify-start w-full text-left text-xs gap-2"
                >
                    <span className="italic bg-slate-600/30 rounded-xl p-1 " >{compVariant?.prod}</span>

                    <span className="bg-slate-600/30 rounded-full p-1" >{compVariant?.size}</span>
                </TextBlock>

            </Link>

        </CardBlock>
    )
}
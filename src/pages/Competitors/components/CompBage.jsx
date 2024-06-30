import React from 'react'
import { CardBlock, ImageArt } from '../../../components';

export default function CompBage({

    comp
}) {
    return (
        <div


            className="
            flex items-stretch gap-2
            lg:text-xl
        hover:shadow-2xl hover:shadow-lg  hover:shadow-fuchsia-500 hover:bg-fuchsia-500   bg-gradient-to-b from-fuchsia-500/50 to-fuchsia-700/50
         rounded-2xl cursor-pointer
        transition-all ease-in-out duration-500	
        ">


            <CardBlock
            className="bg-white rounded-l-xl flex items-center justify-center shrink-0 p-2"
            >
                <ImageArt size={50} artikul={comp?.artikul} className="rounded-l-xl" />
            </CardBlock>

            <CardBlock
                onClick={() => {
                    window.open(`/comps/${comp?._id}`, "_blank");
                }}
                className="flex items-center "
            >
                {comp?.nameukr
                }
                </CardBlock>

        </div>
    )
}

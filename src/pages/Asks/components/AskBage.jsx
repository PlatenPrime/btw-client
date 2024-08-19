import React from 'react'
import { CardBlock, ImageArt, TextBlock } from '../../../components'
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsBalloon } from 'react-icons/bs'
import { formatDateToUkrainianFull } from '../../../utils/formatDate';

export default function AskBage({
    ask,
    onClick,
    artsDB,
    users
}) {


    const styles = {
        "solved": "border-indigo-500   hover:shadow-indigo-500 hover:bg-indigo-500  from-indigo-500/50 to-indigo-700/50",
        "new": "border-green-500   hover:shadow-green-500 hover:bg-green-500  from-green-500/50 to-green-700/50",
        "fail": "border-rose-500  hover:shadow-rose-500 hover:bg-rose-500   from-rose-500/50 to-rose-700/50 "
    }


    return (
        <CardBlock
            key={ask?._id}
            onClick={onClick}
            className={`
                    grid overflow-auto grid-cols-1 lg:grid-cols-5 lg:text-2xl text-indigo-100 
                    transition ease-in-out duration-500
                    rounded-lg cursor-pointer
                    hover:shadow-lg bg-gradient-to-b
                    ${styles[ask?.status]}
                    `}
        >

            <CardBlock
                className="lg:col-span-3 grid grid-cols-4 "
            >


                <CardBlock
                    className="col-span-1 flex justify-center items-center bg-white shadow-md shadow-white  "
                    onClick={(e) => e.stopPropagation()}
                >

                    <ImageArt
                        size={50} artikul={ask?.artikul}


                    />
                </CardBlock>



                <CardBlock
                    className="col-span-3 flex flex-col items-center justify-center  p-2"
                >

                    <TextBlock
                        className=" justify-center text-xl font-bold"
                    >

                        {ask?.artikul}
                    </TextBlock>

                    <TextBlock
                        className=" justify-center items-center w-full text-center text-base italic"
                    >

                        {artsDB?.find((art) => ask?.artikul === art?.artikul)?.nameukr?.slice(10)}
                    </TextBlock>

                </CardBlock>


            </CardBlock>





            <CardBlock
                className="flex flex-wrap gap-2 justify-center items-center"
            >


                {ask?.quant ?
                    <TextBlock
                        className="text-lg font-bold"
                    >
                        <BsBalloon size={12} />	{ask?.quant}
                    </TextBlock>
                    :
                    null

                }

                {ask?.com ?
                    <TextBlock
                        className="text-base italic"
                    >
                        {ask?.com}
                    </TextBlock>
                    :
                    null

                }

            </CardBlock>







            <CardBlock
                className="grid grid-cols-2  p-2 place-content-center"
            >


                <TextBlock
                    className="text-sm italic  place-content-start  lg:place-content-center"
                >

                    {formatDateToUkrainianFull(ask?.createdAt)}
                </TextBlock>

                <TextBlock
                    className="text-sm items-center font-bold place-content-end  lg:place-content-center "
                >

                  {users?.find(user => user._id === ask?.asker)?.fullname}
                </TextBlock>

            </CardBlock>






        </CardBlock>

    )
}

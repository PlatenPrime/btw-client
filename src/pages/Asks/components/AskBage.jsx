import React from 'react'
import { CardBlock, ImageArt, TextBlock } from '../../../components'
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsBalloon } from 'react-icons/bs'

export default function AskBage({
    ask,
    onClick,
    artsDB,
    users
}) {


    const styles = {
        "new": "border-indigo-500   hover:shadow-indigo-500 hover:bg-indigo-500  from-indigo-500/50 to-indigo-900/50",
        "solved": "border-green-500   hover:shadow-green-500 hover:bg-green-500  from-green-500/50 to-green-900/50",
        "fail": "border-rose-500  hover:shadow-rose-500 hover:bg-rose-500   from-rose-500/50 to-rose-900/50 "
    }


    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Kiev'
    };


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
                    className="col-span-4  lg:col-span-1 flex justify-center items-center bg-white shadow-md shadow-white  "
                >

                    <ImageArt 
                    size={100} artikul={ask?.artikul} 
        
                    />
                </CardBlock>



                <CardBlock
                    className="col-span-4   lg:col-span-3 flex flex-col items-center justify-center px-2 bg-sky-500/5 "
                >

                    <TextBlock
                        className=" justify-center text-3xl"
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
                className="flex flex-col justify-center items-center"
            >


                {ask?.quant ?
                    <TextBlock
                        className="text-xl font-bold"
                    >
                        <BsBalloon size={24} />	{ask?.quant}
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




            <CardBlock>


                <CardBlock
                    className="flex flex-col gap-2 justify-center items-center lg:items-end p-2"
                >


                    <TextBlock
                        className="text-sm italic "
                    >
                        < BsQuestionCircle size={24} />
                        {new Date(ask?.createdAt).toLocaleString('uk-UA', options)}
                    </TextBlock>

                    <TextBlock
                        className="text-base items-center font-bold"
                    >

                        {users?.find(user => user._id === ask?.asker)?.fullname}
                    </TextBlock>

                </CardBlock>


                {ask?.updatedAt !== ask?.createdAt &&
                    <CardBlock
                        className="flex flex-col gap-2 justify-center items-center lg:items-end p-2"
                    >
                        <TextBlock
                            className="text-sm italic "
                        >
                            <FaRegCircleCheck size={24} />
                            {new Date(ask?.updatedAt).toLocaleString('uk-UA', options)}
                        </TextBlock>

                        <TextBlock
                            className="text-base items-center font-bold"
                        >
                            {users?.find(user => user._id === ask?.solver)?.fullname}
                        </TextBlock>
                    </CardBlock>
                }


            </CardBlock>




        </CardBlock>

    )
}

import React from 'react'
import { CardBlock, ImageArt, ImageBlock, TextBlock } from '../../../components'
import { FcFolder } from 'react-icons/fc'
import { LuFileEdit, LuFilePlus } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

export default function InsCard({
    ins,
    author
}) {




    return (
        <CardBlock
            key={ins?._id}
            className=" flex flex-col lg:flex-row lg:justify-between gap-2
            p-2 rounded-xl 
            bg-gradient-to-b from-blue-500 to-blue-700 
     transition duration-500 ease-in-out"

        >



            <TextBlock className="text-2xl  lg:text-3xl font-bold justify-center  text-center  "> {ins?.title}</TextBlock>




            <CardBlock
                className=" gap-2 lg:order-first  min-w-[300px] "
            >

                <CardBlock
                    className="flex items-center h-full  justify-center  w-full lg:w-fit  rounded-xl shrink-0 grow-0"
                >
                    {ins?.titleImage ?
                        <ImageArt
                            srcLink={ins?.titleImage}
                           size={200}
                            className=" rounded-xl object-cover " />
                        :

                        <img
                            src='https://placehold.co/600x300?text=Інструкція'
                            width={200}
                            className="rounded-xl object-cover "
                        ></img>}

                </CardBlock>


            </CardBlock>








            <CardBlock
                className=" min-w-fit flex flex-col justify-center items-center p-2 text-sm lg:text-base 
                text-slate-300
            "
            >
                <TextBlock className="  lg:justify-end gap-2 w-full ">

                    <GoPerson className="lg:order-2" />
                    <span>{author?.fullname} </span>
                </TextBlock>

                {ins?.createdAt && <TextBlock className="  lg:justify-end gap-2 w-full ">
                    <LuFilePlus className="lg:order-2" />
                    <span>{new Date(ins?.createdAt).toLocaleString()}</span>

                </TextBlock>}

                {ins?.createdAt !== ins?.updatedAt && <TextBlock className=" lg:justify-end gap-2 w-full ">
                    <LuFileEdit className="lg:order-2" />
                    <span>{new Date(ins?.updatedAt).toLocaleString()}</span>

                </TextBlock>}
            </CardBlock>


        </CardBlock>
    )
}


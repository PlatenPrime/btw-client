import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
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
            className=" grid grid-cols-1 lg:grid-cols-6 gap-2 w-full p-2 rounded-xl 
            bg-gradient-to-b from-blue-500 to-blue-700 
            shadow-lg shadow-blue-500
     transition duration-500 ease-in-out"

        >



            <CardBlock
                className=" gap-2 col-span-1"
            >

                <CardBlock
                    className="flex  justify-center  w-full lg:w-fit  rounded-xl shrink-0 grow-0"
                >
                    {ins?.titleImage ?
                        <img
                            src={ins?.titleImage}
                            alt=""
                            className="w-[200px] rounded-xl object-cover " />
                        :

                        <img
                            src='https://placehold.co/600x300?text=Інструкція'
                            width={200}
                            className="rounded-xl object-cover "
                        ></img>}

                </CardBlock>

               
            </CardBlock>


            <TextBlock className=" md:text-xl lg:text-3xl font-bold lg:justify-center col-span-4  "> {ins?.title}</TextBlock>





            <CardBlock
                className="flex flex-col justify-center lg:items-end col-span-1 "
            >
                <TextBlock className="text-lg  text-slate-200 ">
            
                     <GoPerson className="lg:order-2"/>
                     <span>{author?.fullname} </span> 
                </TextBlock>

                {ins?.createdAt && <TextBlock className="text-sm text-slate-200 ">
                    <span><LuFilePlus className="lg:order-2"  /></span>
                    <span>{new Date(ins?.createdAt).toLocaleString()}</span>
                   
                </TextBlock>}

                {ins?.createdAt !== ins?.updatedAt && <TextBlock className="text-sm text-slate-200 ">
                    <span><LuFileEdit className="lg:order-2" /></span>
                    <span>{new Date(ins?.updatedAt).toLocaleString()}</span>
                    
                </TextBlock>}
            </CardBlock>


        </CardBlock>
    )
}


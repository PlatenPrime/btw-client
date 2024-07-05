import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'
import { FcFolder } from 'react-icons/fc'
import { LuFileEdit, LuFilePlus } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { MdOutlineOndemandVideo } from 'react-icons/md';

export default function InsBage({
    ins,
    insFolder,
    users
}) {

    const navigate = useNavigate()





    return (
        <CardBlock
            key={ins?._id}
            className=" grid grid-cols-1 
            lg:grid-cols-[minmax(400px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_1fr]
            gap-2 w-full p-2 rounded-xl cursor-pointer
            bg-gradient-to-b from-blue-500/80 to-blue-700/50 hover:bg-blue-500 
            hover:shadow-lg hover:shadow-blue-500
     transition duration-500 ease-in-out"
            onClick={() => window.open(`/ins/${ins._id}`, "_blank")}
        >



            <CardBlock
                className="grid grid-cols-1 lg:col-span-2  lg:grid-cols-[200px_minmax(200px,_1fr)] gap-2"
            >

                <CardBlock
                    className="flex  justify-center  w-full lg:w-fit  rounded-xl shrink-0"
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

                <TextBlock className="text-xl font-bold lg:justify-start text-left  "> {ins?.title}  </TextBlock>

            </CardBlock>



            <CardBlock
                className="flex flex-col justify-center text-sm"
            >
                {ins?.videoUrl && <TextBlock ><MdOutlineOndemandVideo size={24} /></TextBlock>}
                <TextBlock className="text-lg text-blue-100 "> <FcFolder className="text-xl" /> {insFolder?.title}</TextBlock>
            </CardBlock>





            <CardBlock
                className="flex flex-col justify-center text-sm"
            >
                <TextBlock className="text-base  text-slate-200 italic">
                    <GoPerson />  {users?.find((user) => user?._id === ins?.author)?.fullname}
                </TextBlock>

                {ins?.createdAt && <TextBlock className=" text-slate-200 ">
                    <span><LuFilePlus /></span>
                    <span>{new Date(ins?.createdAt).toLocaleString()}</span>
                </TextBlock>}

                {ins?.createdAt !== ins?.updatedAt && <TextBlock className=" text-slate-200 ">
                    <span><LuFileEdit /></span>
                    <span>{new Date(ins?.updatedAt).toLocaleString()}</span>
                </TextBlock>}
            </CardBlock>


        </CardBlock>
    )
}

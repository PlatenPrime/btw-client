import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'
import { FcFolder } from 'react-icons/fc'
import { PiFilePlus } from "react-icons/pi";
import { LuFileEdit, LuFilePlus } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

export default function InsBage({
    ins,
    insFolder,
    users
}) {

    const navigate = useNavigate()





    return (
        <CardBlock
            key={ins._id}
            className=" grid grid-cols-1 lg:grid-cols-4 gap-2 w-full p-2 rounded-xl cursor-pointer
            bg-gradient-to-b from-blue-500/50 to-blue-700/50 hover:bg-blue-500 
            hover:shadow-lg hover:shadow-blue-500
     transition duration-500 ease-in-out"
            onClick={() => navigate(`/ins/${ins._id}`)}
        >



            <CardBlock
                className="grid grid-cols-1 lg:grid-cols-2 gap-2"
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

                <TextBlock className="text-xl font-bold lg:justify-start  "> {ins?.title}</TextBlock>

            </CardBlock>




            <TextBlock className="text-xl text-blue-200 "> <FcFolder className="text-xl" /> {insFolder?.title}</TextBlock>



            <TextBlock className="text-xl  text-slate-200">
                <GoPerson />  {users?.find((user) => user?._id === ins?.author)?.fullname}
            </TextBlock>


            <CardBlock
                className="flex flex-col justify-center"
            >


                {ins?.createdAt && <TextBlock className="text-lg text-slate-200 ">
                    <span><LuFilePlus /></span>
                    <span>{new Date(ins?.createdAt).toLocaleString()}</span>
                </TextBlock>}

                {ins?.createdAt !== ins?.updatedAt && <TextBlock className="text-lg text-slate-200 ">
                    <span><LuFileEdit /></span>
                    <span>{new Date(ins?.updatedAt).toLocaleString()}</span>
                </TextBlock>}
            </CardBlock>


        </CardBlock>
    )
}

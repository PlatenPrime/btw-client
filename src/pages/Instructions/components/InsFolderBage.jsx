import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { FcFolder } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';

export default function InsFolderBage({
    insFolder,
}) {

    const navigate = useNavigate();

    return (
        <CardBlock
            key={insFolder._id}
            onClick={() => navigate(`/insfolder/${insFolder._id}`)}
            className="group rounded-xl flex justify-center items-center

                      bg-gradient-to-b from-blue-500/80 to-blue-900/50
                      hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500 
                      transition duration-500 ease-in-out  cursor-pointer "
        >

            <FcFolder className="text-5xl" />
            <TextBlock className="  text-xl px-2 py-1 rounded-lg   w-full ">
                {insFolder?.title}
            </TextBlock>


        </CardBlock>
    )
}

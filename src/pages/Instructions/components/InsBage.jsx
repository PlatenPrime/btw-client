import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'

export default function InsBage({
    ins,
    users
}) {

    const navigate = useNavigate()





    return (
        <CardBlock
            key={ins._id}
            className=" flex flex-col lg:flex-row items-center space-x-4 w-full p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 cursor-pointer
     transition duration-500 ease-in-out"
            onClick={() => navigate(`/ins/${ins._id}`)}
        >
            <CardBlock
                className="flex justify-center items-center w-full lg:w-fit  rounded-xl"
            >
                {ins?.titleImage ?
                    <img src={ins?.titleImage} alt="" className="w-[300px] rounded-xl " />

                    :

                    <img
                        src='https://placehold.co/600x300?text=Інструкція'
                        width={300}
                        className="rounded-xl"
                    ></img>}
            </CardBlock>


            <CardBlock>
                <TextBlock className="text-3xl "> {ins?.title}</TextBlock>

                {ins?.author && users?.find((user) => user?._id === ins?.author) &&
                    <TextBlock className="text-xl text-slate-400">
                        {users?.find((user) => user?._id === ins?.author)?.fullname}
                    </TextBlock>}

                {ins?.createdAt && <TextBlock className="text-lg text-slate-400 justify-start">Створена: {new Date(ins?.createdAt).toLocaleString()}</TextBlock>}
                {ins?.updatedAt && <TextBlock className="text-lg text-slate-400 justify-start">Змінена: {new Date(ins?.updatedAt).toLocaleString()}</TextBlock>}
            </CardBlock>
        </CardBlock>
    )
}

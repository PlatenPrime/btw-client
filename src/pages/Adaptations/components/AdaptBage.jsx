import React from 'react'
import { CardBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'

export default function AdaptBage({ adapt }) {

const navigate = useNavigate()


    return (
       
                <CardBlock
                    onClick={() => navigate(`/adapts/${adapt._id}`)}
                    key={adapt._id}
                    className="text-center text-3xl p-4  rounded-xl cursor-pointer 
                    hover:shadow-2xl hover:shadow-lg  hover:shadow-green-500 hover:bg-green-500   bg-slate-600/30
                    transition duration-500 ease-in-out"
                >
                    {adapt.title}
                </CardBlock>

    )
}

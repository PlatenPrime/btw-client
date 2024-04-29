import React from 'react'
import { CardBlock } from '../../../components'
import { useNavigate } from 'react-router-dom'

export default function AdaptBage({ adapt }) {

const navigate = useNavigate()


    return (
       
                <CardBlock
                    onClick={() => navigate(`/adapts/${adapt._id}`)}
                    key={adapt._id}
                    className="text-center text-3xl p-4 bg-green-500/20 hover:bg-green-500 rounded-xl cursor-pointer transition duration-500 ease-in-out"
                >
                    {adapt.title}
                </CardBlock>

    )
}

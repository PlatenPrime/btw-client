import React from 'react'
import { CardBlock, ContainerBlock, TextBlock } from '../../../components'
import { BsBalloon, BsQuestionCircle } from 'react-icons/bs'
import useFetchUsers from '../../Auth/hooks/useFetchUsers';
import useAuthStore from '../../Auth/authStore';
import { FaRegCircleCheck } from 'react-icons/fa6';














const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Kiev'
};




const statusBackground = {
    'solved': 'from-green-500/50 to-green-900/50',
    'fail': 'from-red-500/50 to-red-900/50',
    'new': 'from-indigo-500/50 to-indigo-900/50'

}



export default function AskInfo({
    ask
}) {


    const { isLoadingUsers } = useFetchUsers()
    const { users } = useAuthStore()







    return (
        <ContainerBlock
            className={statusBackground[ask?.status]}
        >



            <CardBlock
                className="flex flex-col justify-center items-center"
            >
                {ask?.quant ?
                    <TextBlock
                        className="text-3xl font-bold"
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


            <CardBlock
                className="flex  gap-2 justify-center items-center lg:items-end p-2"
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
                    className="flex  gap-2 justify-center items-center  p-2"
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



        </ContainerBlock>
    )
}

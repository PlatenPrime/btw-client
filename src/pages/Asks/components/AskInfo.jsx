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






export default function AskInfo({
    ask
}) {


    const { isLoadingUsers } = useFetchUsers()
    const { users } = useAuthStore()







    return (
        <ContainerBlock
            className="grid lg:grid-cols-2  gap-2"
        >



            <CardBlock
                className="grid"
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



            <CardBlock
            
            >

                <CardBlock
                    className="flex flex-col lg:flex-row  gap-2 justify-center items-center lg:items-end p-2"
                >
                    <TextBlock
                        className="text-xs italic "
                    >
                        < BsQuestionCircle size={12} />
                        {new Date(ask?.createdAt).toLocaleString('uk-UA', options)}
                    </TextBlock>

                    <TextBlock
                        className="text-xs items-center font-bold"
                    >
                        {users?.find(user => user._id === ask?.asker)?.fullname}
                    </TextBlock>



                </CardBlock>


                {ask?.updatedAt !== ask?.createdAt &&
                    <CardBlock
                        className="flex flex-col lg:flex-row  gap-2 justify-center items-center  p-2"
                    >
                        <TextBlock
                            className="text-xs italic "
                        >
                            <FaRegCircleCheck size={12} />
                            {new Date(ask?.updatedAt).toLocaleString('uk-UA', options)}
                        </TextBlock>

                        <TextBlock
                            className="text-xs items-center font-bold"
                        >
                            {users?.find(user => user._id === ask?.solver)?.fullname}
                        </TextBlock>
                    </CardBlock>
                }
            </CardBlock>


        </ContainerBlock>
    )
}

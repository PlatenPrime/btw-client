import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, Spinner, TextBlock } from '../../../components'
import useFetchArts from '../../../hooks/useFetchArts'
import { useNavigate } from 'react-router-dom'
import useFetchUsers from '../../Auth/hooks/useFetchUsers'
import useAuthStore from '../../Auth/authStore'
import AskBage from './AskBage'

export default function AsksContainer({
    isAsksLoading,
    asks
}) {


    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()
    const { isLoadingUsers } = useFetchUsers()

    const navigate = useNavigate()

    const { users } = useAuthStore()



    if (isAsksLoading) {
        return (
            <ContainerBlock
                className="space-y-2 "
            >
                <Spinner color="#6366f1" />
            </ContainerBlock>
        )
    }


    return (
        <ContainerBlock
            className="space-y-2 "
        >
            {asks?.map((ask) =>
                <AskBage
                    key={ask?._id}
                    ask={ask}
                    onClick={() => navigate(`/asks/${ask?._id}`)}
                    artsDB={artsDB}
                    users={users}

                />
            )
            }
        </ContainerBlock>

    )
}

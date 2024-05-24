import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, Spinner, TextBlock } from '../../../components'
import useFetchArts from '../../../hooks/useFetchArts'
import { useNavigate } from 'react-router-dom'
import useFetchUsers from '../../Auth/hooks/useFetchUsers'
import useAuthStore from '../../Auth/authStore'
import AskBage from './AskBage'
import { groupByDate, formatDateToUkrainian } from "../../../utils/groupByDate"

export default function AsksContainer({
    isAsksLoading,
    asks
}) {


    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()
    const { isLoadingUsers } = useFetchUsers()

    const navigate = useNavigate()

    const { users } = useAuthStore()



    const groupedAsks = groupByDate(asks);






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
            className="space-y-4 "
        >

            {Object.keys(groupedAsks).map(date => (
                <CardBlock
                    className="space-y-2 "
                    key={date}>


                    <h2
                        className="text-3xl font-bold bg-gradient-to-b from-slate-500 to-slate-900/50 rounded-xl"
                    >
                        {formatDateToUkrainian(date)}
                    </h2>

                    <CardBlock
                        className="space-y-2"
                    >
                        {groupedAsks[date].map(ask => (
                            <AskBage
                                key={ask?._id}
                                ask={ask}
                                onClick={() => navigate(`/asks/${ask?._id}`)}
                                artsDB={artsDB}
                                users={users}
                            />
                        ))}
                    </CardBlock>


                </CardBlock>
            ))}

        </ContainerBlock>

    )
}

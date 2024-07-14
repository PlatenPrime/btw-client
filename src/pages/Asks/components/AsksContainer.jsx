import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, Spinner, TextBlock } from '../../../components'
import useFetchArts from '../../../hooks/useFetchArts'
import { useNavigate } from 'react-router-dom'
import useFetchUsers from '../../Auth/hooks/useFetchUsers'
import useAuthStore from '../../Auth/authStore'
import AskBage from './AskBage'
import { groupByDate} from "../../../utils/groupByDate"
import { FcDeployment } from 'react-icons/fc'
import { formatDateToUkrainianShort } from '../../../utils/formatDate'

export default function AsksContainer({
    isAsksLoading,
    asks
}) {


    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()
    const { isLoadingUsers } = useFetchUsers()

    const navigate = useNavigate()

    const { users } = useAuthStore()



    const groupedAsks = groupByDate(asks);




    return (
        <ContainerBlock
            className="grid gap-4 "
        >



            {Object.keys(groupedAsks).map(date => (
             
                    <CardBlock
                        key={date}
                        className="grid gap-2   rounded-xl "
                    >
                        <CardBlock
                            className="text-3xl  flex flex-col lg:flex-row justify-between bg-gradient-to-b from-slate-500/50 to-slate-700/50 rounded-xl p-2"
                        >
                            <h2 className="font-bold"   >{formatDateToUkrainianShort(date)} </h2>
                            <TextBlock>
                                {groupedAsks[date].filter(ask => ask.status !== "new").length} / {groupedAsks[date].length}
                            </TextBlock>
                        </CardBlock>


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
            ))}

        </ContainerBlock>

    )
}

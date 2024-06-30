
import React from 'react'
import { HeaderBlock, PageBTW } from '../../../components'
import { useParams } from 'react-router-dom'
import useFetchCompById from '../hooks/useFetchCompById'

export default function NewCompPage() {


    const { id } = useParams()

    const { comp, isCompLoading, error } = useFetchCompById(id)





    return (
        <PageBTW

            isLoading={isCompLoading}


        >

            <HeaderBlock
                className="bg-fuchsia-500 shadow-lg shadow-fuchsia-500"
            >
                Конкуренти {comp?.artikul}
            </HeaderBlock>




        </PageBTW>
    )
}

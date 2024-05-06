import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import ArtBage from './ArtBage'

export default function ArtsContainer({
    filteredArts,
    artsDB,
    step,
    page,
    remains,

}) {
    return (
        <CardBlock className="space-y-2">
            {filteredArts?.length === 0 
            ?
                <TextBlock>Нічого не знайдено</TextBlock>

                :

                filteredArts?.length === artsDB?.length
                    ?
                    artsDB?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)
                    :
                    filteredArts?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)}

        </CardBlock>

    )
}

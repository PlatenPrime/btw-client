import React from 'react'
import { ButtonBlock, CardBlock, TextBlock } from '../../../components'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

export default function PaginationBlock({
    filteredArts,
    page,
    step,
    setPage,
    artsDB
}) {
    return (
        <div>{filteredArts?.length === 0
            ?
            null
            :
            filteredArts?.length === artsDB?.length
                ?
                <CardBlock
                    className="flex flex-wrap justify-between p-2  rounded-xl"
                >

                    <TextBlock>
                        Всього: {artsDB?.length > 0 && artsDB?.length}
                    </TextBlock>



                    {artsDB > 0 ?
                        <TextBlock
                            className=""
                        >
                            {step * page - step + 1} - {step * page < artsDB?.length ? step * page : artsDB?.length}
                        </TextBlock>

                        :
                        null
                    }









                    <CardBlock
                        className="space-x-3 flex flex-wrap "
                    >

                        <ButtonBlock onClick={() => setPage(1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b border-none bg-sky-500/10" disabled={page === 1}>

                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <TextBlock>
                            Сторінка: {page}
                        </TextBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b border-none bg-sky-500/10" disabled={artsDB?.length / step / page < 1}>

                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowRight />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage(Math.ceil(artsDB?.length / step))} className="sky-b border-none bg-sky-500/10 " disabled={artsDB?.length / step / page < 1}>

                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleRight />
                            </TextBlock>
                        </ButtonBlock>



                    </CardBlock>

                </CardBlock>

                :

                <CardBlock
                    className="flex flex-wrap justify-between p-2 "
                >




                    <TextBlock>
                        Знайдено: {filteredArts?.length}
                    </TextBlock>



                    <TextBlock
                        className="text-xl"

                    >
                        {step * page - step + 1} - {step * page < filteredArts?.length ? step * page : filteredArts?.length}
                    </TextBlock>



                    <CardBlock
                        className="space-x-3 flex flex-wrap"
                    >

                        <ButtonBlock onClick={() => setPage(1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <TextBlock>
                            Сторінка: {page}
                        </TextBlock>


                        <ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b border-none bg-sky-500/10 " disabled={filteredArts?.length / step / page < 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowRight />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage(Math.ceil(filteredArts?.length / step))} className="sky-b border-none bg-sky-500/10 " disabled={filteredArts?.length / step / page < 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleRight />
                            </TextBlock>

                        </ButtonBlock>

                    </CardBlock>

                </CardBlock>


        }
        </div>
    )
}

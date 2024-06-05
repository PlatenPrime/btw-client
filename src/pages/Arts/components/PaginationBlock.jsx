import React from 'react'
import { ButtonBlock, CardBlock, TextBlock } from '../../../components'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

export default function PaginationBlock({
    allItems,
    filteredItems,
    page,
    step,
    setPage,
    
}) {
    return (
        <div>{filteredItems?.length === 0
            ?
            null
            :
            filteredItems?.length === allItems?.length
                ?
                <CardBlock
                    className="flex flex-wrap justify-between p-2  rounded-xl"
                >

                    <TextBlock>
                        Всього: {allItems?.length > 0 && allItems?.length}
                    </TextBlock>



                    {allItems.length > 0 ?
                        <TextBlock
                            className=""
                        >
                            {step * page - step + 1} - {step * page < allItems?.length ? step * page : allItems?.length}
                        </TextBlock>

                        :
                        null
                    }


                    <CardBlock
                        className="space-x-3 flex flex-wrap "
                    >

                        <ButtonBlock onClick={() => setPage(1)} className="slate-b border-none  bg-gradient-to-b from-slate-500/50 to-slate-700/50 " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50 " disabled={page === 1}>

                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <TextBlock>
                            Сторінка: {page}
                        </TextBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50 " disabled={allItems?.length / step / page <= 1}>

                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowRight />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage(Math.ceil(allItems?.length / step))} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50  " disabled={allItems?.length / step / page <= 1}>

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
                        Знайдено: {filteredItems?.length}
                    </TextBlock>



                    <TextBlock
                        className=""

                    >
                        {step * page - step + 1} - {step * page < filteredItems?.length ? step * page : filteredItems?.length}
                    </TextBlock>



                    <CardBlock
                        className="space-x-3 flex flex-wrap"
                    >

                        <ButtonBlock onClick={() => setPage(1)} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50  " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineDoubleLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50  " disabled={page === 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowLeft />
                            </TextBlock>
                        </ButtonBlock>

                        <TextBlock>
                            Сторінка: {page}
                        </TextBlock>


                        <ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50  " disabled={filteredItems?.length / step / page <= 1}>
                            <TextBlock className="text-lg lg:text-2xl">
                                <AiOutlineArrowRight />
                            </TextBlock>
                        </ButtonBlock>

                        <ButtonBlock onClick={() => setPage(Math.ceil(filteredItems?.length / step))} className="slate-b border-none bg-gradient-to-b from-slate-500/50 to-slate-700/50  " disabled={filteredItems?.length / step / page <= 1}>
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

import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, TextBlock } from '../../../../components'
import { formatDateToUkrainianShort } from '../../../../utils/formatDate'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { LuCalendarDays } from 'react-icons/lu';
import { ExcelIcon } from '../../../../components/UI/Icons';
import { exportCompStampToExcel } from '../../../../utils/exportExcel';

export default function CompStamp({
    compStamp
}) {


    const [currentIndex, setCurrentIndex] = useState(compStamp?.dates?.length - 1)

    const start = 0;
    const end = compStamp?.dates?.length - 1;





    if (!compStamp) return <ContainerBlock
        className="grid gap-2"
    >
        <TextBlock
        className="text-center "
        >
            Хронологія відсутня
        </TextBlock>
    </ContainerBlock>



    return (
        <ContainerBlock
            className="grid gap-2"
        >

            <CardBlock
                className="grid gap-2 lg:grid-cols-3"
            >



                <TextBlock
                    className=" lg:-order-1  rounded-xl"
                >
                    <LuCalendarDays size={20} color='rgb(96 165 250)' /> {compStamp?.dates?.length}
                </TextBlock>


                <CardBlock
                    className="grid place-content-center lg:order-1 "
                >
                    <ButtonBlock
                        className="emerald-b"
                        onClick={() => exportCompStampToExcel(compStamp)}
                    >
                        <ExcelIcon /> Хронологія
                    </ButtonBlock>
                </CardBlock>



                <DateControlPanel
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    end={end}
                    compStamp={compStamp}
                    start={start}
                />





            </CardBlock>



            <CardBlock
                className="grid "
            >

                <CompetitorItem
                    name="BTrade"
                    availability={compStamp?.dates?.[currentIndex].avail?.btrade}
                    price={compStamp?.dates?.[currentIndex].price?.btrade}
                    isNumericAvailability
                />

                <CompetitorItem
                    name="Yumi"
                    availability={compStamp?.dates?.[currentIndex].avail?.yumi}
                    price={compStamp?.dates?.[currentIndex].price?.yumi}
                    isNumericAvailability
                />


                <CompetitorItem
                    name="Sharte"
                    availability={compStamp?.dates?.[currentIndex].avail?.sharte}
                    price={compStamp?.dates?.[currentIndex].price?.sharte}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.sharte === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.sharte ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Air"
                    availability={compStamp?.dates?.[currentIndex].avail?.air}
                    price={compStamp?.dates?.[currentIndex].price?.air}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.air === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.air ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Best"
                    availability={compStamp?.dates?.[currentIndex].avail?.best}
                    price={compStamp?.dates?.[currentIndex].price?.best}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.best === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.best ? "text-green-500" : ""}
                />


            </CardBlock>

        </ContainerBlock>
    )
}

function CompetitorItem({ name, availability, price, availabilityClasses, priceClasses, isNumericAvailability }) {
    return (
        <CardBlock className="grid grid-cols-3 gap-2 bg-gradient-to-b from-slate-600/50 to-slate-900/50 rounded-xl p-2">
            <TextBlock
            >
                {name}
            </TextBlock>
            <TextBlock className={`text-sky-200 ${availabilityClasses}`}>
                {isNumericAvailability ? availability : (availability === "N/A" ? "N/A" : availability ? '✅' : '❌')}
            </TextBlock>
            <TextBlock className={`text-green-500 ${priceClasses}`}>
                {price}
            </TextBlock>
        </CardBlock>
    )
}


function DateControlPanel({ currentIndex, setCurrentIndex, end, compStamp, start }) {
    return (
        <CardBlock
            className="flex justify-center  items-center gap-2 text-sm lg:text-lg "
        >
            <CardBlock>
                <ButtonBlock
                    disabled={currentIndex === start}
                    onClick={() => setCurrentIndex(start)}
                    className="slate-b border-none  bg-gradient-to-b from-slate-500/50 to-slate-700/50  "
                >
                    <AiOutlineDoubleLeft />
                </ButtonBlock>

            </CardBlock>

            <CardBlock>
                <ButtonBlock
                    disabled={currentIndex === start}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="slate-b border-none  bg-gradient-to-b from-slate-500/50 to-slate-700/50  "
                >
                    <AiOutlineArrowLeft />
                </ButtonBlock>

            </CardBlock>

            <TextBlock
                className="font-bold "
            >
                {compStamp?.dates?.[currentIndex].date && formatDateToUkrainianShort(compStamp?.dates?.[currentIndex].date)}
            </TextBlock>


            <CardBlock>
                <ButtonBlock
                    disabled={currentIndex === end}
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="slate-b border-none  bg-gradient-to-b from-slate-500/50 to-slate-700/50  "
                >
                    <AiOutlineArrowRight />
                </ButtonBlock>
            </CardBlock>

            <CardBlock>
                <ButtonBlock
                    disabled={currentIndex === end}
                    onClick={() => setCurrentIndex(end)}
                    className="slate-b border-none  bg-gradient-to-b from-slate-500/50 to-slate-700/50  "
                >
                    <AiOutlineDoubleRight />
                </ButtonBlock>
            </CardBlock>


        </CardBlock>
    )


}
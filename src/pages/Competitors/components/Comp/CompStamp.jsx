import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, TextBlock } from '../../../../components'
import { formatDateToUkrainianShort } from '../../../../utils/formatDate'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { LuCalendarDays } from 'react-icons/lu';
import { ExcelIcon } from '../../../../components/UI/Icons';
import { exportCompStampToExcel } from '../../../../utils/exportExcel';

export default function CompStamp({
    compStamp,
    isVariant
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
                className="grid gap-2 lg:grid-cols-2 "
            >

                <DateControlPanel
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    end={end}
                    compStamp={compStamp}
                    start={start}
                />


                <CardBlock
                    className="grid grid-cols-2 place-content-center  "
                >

                    <ButtonBlock
                        className="emerald-b"
                        onClick={() => exportCompStampToExcel(compStamp)}
                    >
                        <ExcelIcon /> Хронологія
                    </ButtonBlock>

                    <TextBlock
                        className="   rounded-xl"
                    >
                        <LuCalendarDays size={20} color='rgb(96 165 250)' /> {compStamp?.dates?.length}
                    </TextBlock>
                </CardBlock>



            </CardBlock>



            <CardBlock
                className="grid gap-1 "
            >

                {!isVariant && <CompetitorItem
                    name="BTrade"
                    imageLink="https://sharik.ua/local/templates/main/images/ua-logo.png"
                    availability={compStamp?.dates?.[currentIndex].avail?.btrade}
                    price={compStamp?.dates?.[currentIndex].price?.btrade}
                    isNumericAvailability
                />}



                <CompetitorItem
                    name="Yumi"
                    imageLink="https://images.prom.ua/2620988838_w350_h100_yumi-optovij.jpg"
                    availability={compStamp?.dates?.[currentIndex].avail?.yumi}
                    price={compStamp?.dates?.[currentIndex].price?.yumi}
                    isNumericAvailability
                />

                <CompetitorItem
                    name="IdeaOpt"
                    imageLink="https://ideaopt.com.ua/image/catalog/logo-idea.png"
                    availability={compStamp?.dates?.[currentIndex].avail?.idea}
                    price={compStamp?.dates?.[currentIndex].price?.idea}
                    isNumericAvailability
                />


                <CompetitorItem
                    name="Sharte"
                    imageLink="https://sharte.net/local/templates/dresscodeV2/images/logo_shartico2.png"
                    availability={compStamp?.dates?.[currentIndex].avail?.sharte}
                    price={compStamp?.dates?.[currentIndex].price?.sharte}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.sharte === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.sharte ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Air"
                    imageLink="https://airballoons.com.ua/image/catalog/logo_IVVO11.png"
                    availability={compStamp?.dates?.[currentIndex].avail?.air}
                    price={compStamp?.dates?.[currentIndex].price?.air}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.air === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.air ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Best"
                    imageLink="https://best-balloons.com.ua/wp-content/uploads/2019/05/wood-logo-dark.jpg"
                    availability={compStamp?.dates?.[currentIndex].avail?.best}
                    price={compStamp?.dates?.[currentIndex].price?.best}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.best === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.best ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Aero"
                    imageLink="https://images.prom.ua/4361922127_w350_h100_aero-bum.jpg"
                    availability={compStamp?.dates?.[currentIndex].avail?.aero}
                    price={compStamp?.dates?.[currentIndex].price?.aero}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.aero === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.aero ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Balun"
                    imageLink="https://images.prom.ua/2069861087_w250_h120_balun-optovij.jpg"
                    availability={compStamp?.dates?.[currentIndex].avail?.balun}
                    price={compStamp?.dates?.[currentIndex].price?.balun}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.balun === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.balun ? "text-green-500" : ""}
                />

                <CompetitorItem
                    name="Svyato"
                    imageLink="https://svyatoopt.com.ua/content/images/2/200x100l90nn0/52579472314969.webp"
                    availability={compStamp?.dates?.[currentIndex].avail?.svyato}
                    price={compStamp?.dates?.[currentIndex].price?.svyato}
                    availabilityClasses={compStamp?.dates?.[currentIndex].avail?.svyato === "N/A" ? "" : "text-sky-200"}
                    priceClasses={compStamp?.dates?.[currentIndex].price?.svyato ? "text-green-500" : ""}
                />


            </CardBlock>

        </ContainerBlock>
    )
}

function CompetitorItem({ name, imageLink, availability, price, availabilityClasses, priceClasses, isNumericAvailability }) {


    const availOptions = {
        true: "✅",
        false: "❌",
        "N/A": "N/A",
    }



    return (
        <CardBlock className={`bg-slate-500/20 hover:bg-slate-400/20  grid grid-cols-3 gap-2  rounded-xl p-2`}>
            <TextBlock
                className="justify-start"
            >
                <span>{name}</span>
                <img src={imageLink} alt={name} className=" h-4 object-cover mx-2" />
            </TextBlock>
            <TextBlock className={`text-sky-200 ${availabilityClasses}  ${availability === "N/A" && "grayscale"}  `}>
                {isNumericAvailability ? availability : availOptions[availability]}
            </TextBlock>
            <TextBlock className={`text-green-500 ${priceClasses} ${price === "N/A" && "grayscale"}  `}>
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
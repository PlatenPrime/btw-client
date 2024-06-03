import React from 'react'
import { ButtonBlock, CardBlock, ImageArt, TextBlock } from '../../../components';



export default function DefBage({
    def,
    artsDB,
    asks,
    setShowModalCreateAsk,
    setNewAskArtikul
}) {


    return (
        <CardBlock
            className="grid text-sm  lg:grid-cols-6 gap-2 p-2 bg-gradient-to-b from-slate-700/50 to-slate-900/50   rounded-xl"
        >
            <CardBlock
                className="lg:col-span-3 flex "
            >
                <CardBlock
                    className="lg:col-span-1 bg-white flex justify-center items-center rounded-l-lg"
                >
                    <ImageArt size={100} artikul={def.artikul} className="rounded-l-lg" />

                </CardBlock>


                <CardBlock
                    className=" w-full flex flex-col items-center justify-center px-2 
                bg-gradient-to-b from-sky-500/10 to-sky-800/10
                hover:shadow-lg hover:shadow-sky-500
                 cursor-pointer rounded-r-xl "

                    onClick={() => {
                        const artId = artsDB?.find(art => art.artikul === def.artikul)?._id || "";
                        const url = `/arts/${artId}`;
                        window.open(url, "_blank");
                    }}
                >

                    <TextBlock
                        className=" justify-center text-3xl"
                    >

                        {def?.artikul}
                    </TextBlock>

                    <TextBlock
                        className=" justify-center items-center w-full text-center text-base italic"
                    >

                        {def?.nameukr}
                    </TextBlock>

                </CardBlock>


            </CardBlock>





            <CardBlock
                className="lg:col-span-2 justify-self-stretch flex flex-col items-start justify-around  rounded-lg text-lg"
            >


                <CardBlock
                    className=" p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
                >
                    <TextBlock className=" " >
                        Запаси:
                    </TextBlock>

                    <TextBlock
                        className=""
                    >
                        {def?.stockQuant}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className=" p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
                >
                    <TextBlock className=" " >
                        База:
                    </TextBlock>

                    <TextBlock
                        className=""
                    >
                        {def?.btradeQuant}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className=" p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
                >
                    <TextBlock className=" " >
                        Дефіцит:
                    </TextBlock>

                    <TextBlock className="text-red-500 font-bold">{def?.btradeQuant - def?.stockQuant}</TextBlock>
                </CardBlock>
            </CardBlock>

            <CardBlock
                className={`
                    
                    ${asks?.find(ask => ask.artikul === def.artikul)?.status === "new" ?
                        "bg-gradient-to-b from-indigo-500/50 to-indigo-800/50"
                        :
                        ""}
                    
                    lg:col-span-1 flex justify-center items-center rounded-xl`}
            >

                {asks?.find(ask => ask.artikul === def.artikul)?.status === "new" ?
                    <TextBlock className="text-xl text-center text-white">
                        Запит в роботі
                    </TextBlock>
                    :
                    <ButtonBlock
                        className="indigo-b"
                        onClick={() => {
                            setShowModalCreateAsk(true)
                            setNewAskArtikul(def.artikul)
                        }}
                        disabled={asks?.find(ask => ask.artikul === def.artikul)?.status === "new"}
                    >
                        Створити запит
                    </ButtonBlock>
                }



            </CardBlock>




        </CardBlock>
    )
}

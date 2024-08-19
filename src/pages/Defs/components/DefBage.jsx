import React from 'react'
import { ButtonBlock, CardBlock, ImageArt, TextBlock } from '../../../components';
import { AddIcon } from '../../../components/UI/Icons';
import ArtBlock from '../../../components/UI/ArtBlock/ArtBlock';
import { GoDiff, GoGlobe, GoNote } from 'react-icons/go';



export default function DefBage({
    def,
    asks,
    setShowModalCreateAsk,
    setNewAskArtikul
}) {




    const status = asks?.find(ask => ask.artikul === def.artikul)?.status


    return (
        <CardBlock
            className="grid text-sm  lg:grid-cols-6 gap-2 bg-gradient-to-b from-slate-700 to-slate-900   rounded-xl shadow-1 shadow-white/50 overflow-hidden
            hover:shadow-md hover:shadow-white/50
            transition ease-in-out duration-500
            
            "
        >


            <ArtBlock
                artikul={def?.artikul}
               
            />




            <CardBlock
                className={` 
                    lg:col-span-1 flex justify-center items-center `}
            >

                {status === "new" ?
                    <TextBlock className=" text-center text-white p-2 bg-gradient-to-b from-indigo-500 to-indigo-800 rounded-xl">
                        Запит в роботі
                    </TextBlock>
                    :
                    <ButtonBlock
                        className="indigo-b"
                        onClick={() => {
                            setShowModalCreateAsk(true)
                            setNewAskArtikul(def.artikul)
                        }}
                        disabled={status === "new"}
                    >
                        <AddIcon />
                        Запит
                    </ButtonBlock>
                }

            </CardBlock>


            <CardBlock
                className="lg:col-span-2 justify-self-stretch flex flex-col items-start justify-around  rounded-lg "
            >
                <CardBlock
                    className=" p-2 flex justify-between w-full "
                >
                    <TextBlock className=" " >
                        <GoNote  color='rgb(110 231 183)' />   Запаси:
                    </TextBlock>

                    <TextBlock
                        className="text-emerald-300"
                    >
                        {def?.stockQuant}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className=" p-2 flex justify-between w-full "
                >
                    <TextBlock className=" " >
                    <GoGlobe color='rgb(147 197 253)' />  База:
                    </TextBlock>

                    <TextBlock
                        className="text-blue-300"
                    >
                        {def?.btradeQuant}
                    </TextBlock>
                </CardBlock>


                <CardBlock
                    className=" p-2 flex justify-between w-full  "
                >
                    <TextBlock className=" " >
                        <GoDiff color='rgb(239 68 68)' />
                        Дефіцит:
                    </TextBlock>

                    <TextBlock className="text-red-500 font-bold">{def?.btradeQuant - def?.stockQuant}</TextBlock>
                </CardBlock>
            </CardBlock>






        </CardBlock>
    )
}

import React from 'react'
import { CardBlock, ContainerBlock, TextBlock } from '../../../components'

export default function CompInfo({

    comp
}) {
    return (
        <ContainerBlock
            className="grid gap-2"
        >



            <CardBlock
                className="grid grid-cols-3  gap-2  rounded-xl"
            >
                <TextBlock
                    className="font-bold"
                >
                    Конкурент
                </TextBlock>
                <TextBlock
                    className="font-bold"
                >
                    Наявність
                </TextBlock>
                <TextBlock
                    className="font-bold"
                >
                    Ціна
                </TextBlock>
            </CardBlock>






            <CardBlock
                className="grid grid-cols-3  gap-2 bg-slate-500/20 rounded-xl"
            >
                <TextBlock
                    onClick={() => window.open(`https://sharik.ua/search/?q=${comp?.artikul}`)}
                    className="cursor-pointer hover:bg-sky-500 rounded-xl p-2 
                        bg-gradient-to-b from-sky-500/50 to-sky-900/50
                        "
                >
                    BTrade
                </TextBlock>
                <TextBlock
                    className="text-sky-300"
                >
                    {comp?.avail?.btrade}
                </TextBlock>
                <TextBlock
                    className="text-green-500"
                >
                    {comp?.price?.btrade}
                </TextBlock>
            </CardBlock>


            <CardBlock
                className="grid grid-cols-3  gap-2 bg-slate-500/20 rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.yumiLink) window.open(comp?.competitorsLinks?.yumiLink) }}
                    className="cursor-pointer hover:bg-amber-500 rounded-xl p-2 
                        bg-gradient-to-b from-amber-500/50 to-amber-900/50
                        "
                >
                    Yumi
                </TextBlock>
                <TextBlock
                    className="text-sky-300"
                >
                    {comp?.avail?.yumi}
                </TextBlock>
                <TextBlock
                    className="text-green-500"
                >
                    {comp?.price?.yumi}
                </TextBlock>
            </CardBlock>


            <CardBlock
                className="grid grid-cols-3  gap-2 bg-slate-500/20 rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.sharteLink) window.open(comp?.competitorsLinks?.sharteLink) }}
                    className="cursor-pointer hover:bg-blue-500 rounded-xl p-2 
                        bg-gradient-to-b from-blue-500/50 to-blue-900/50
                        "
                >
                    Sharte
                </TextBlock>

                <TextBlock
                    className="text-sky-300"
                >
                    {comp?.avail?.sharte ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {comp?.price?.sharte}
                </TextBlock>
            </CardBlock>




            <CardBlock
                className="grid grid-cols-3  gap-2 bg-slate-500/20 rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.airLink) window.open(comp?.competitorsLinks?.airLink) }}
                    className="cursor-pointer hover:bg-green-500 rounded-xl p-2 
                        bg-gradient-to-b from-green-500/50 to-green-900/50
                        "
                >
                    Air
                </TextBlock>

                <TextBlock
                    className="text-sky-300"
                >
                    {comp?.avail?.air ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {comp?.price?.air}
                </TextBlock>
            </CardBlock>

            <CardBlock
                className="grid grid-cols-3  gap-2 bg-slate-500/20 rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.bestLink) window.open(comp?.competitorsLinks?.bestLink) }}
                    className="cursor-pointer hover:bg-pink-500 rounded-xl p-2 
                        bg-gradient-to-b from-pink-500/50 to-pink-900/50
                        "
                >
                    Best
                </TextBlock>

                <TextBlock
                    className="text-sky-300"
                >
                    {comp?.avail?.best ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {comp?.price?.best}
                </TextBlock>
            </CardBlock>



        </ContainerBlock>
    )
}

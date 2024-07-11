import React from 'react'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../components'
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { TbResize } from 'react-icons/tb'

export default function CompInfo({

    comp,
    isGettingUpdateCompByArtikul
}) {
    return (
        <ContainerBlock
            className="grid gap-2"
        >


            <CardBlock
                className="flex flex-col lg:flex-row  items-center justify-between gap-2 w-full p-2 rounded-xl
                bg-gradient-to-b from-fuchsia-500/80 to-fuchsia-700/50 font-bold text-xl
                "
            >


                <CardBlock
                    className="flex justify-between gap-2 min-w-fit max-w-lg "
                >
                    <TextBlock> <MdOutlinePrecisionManufacturing /></TextBlock>
                    <TextBlock> {comp?.prod}</TextBlock>
                </CardBlock>

                <CardBlock
                    className="flex justify-between gap-2 min-w-fit max-w-lg"
                >
                    <TextBlock> <MdOutlineCategory />  </TextBlock>
                    <TextBlock> {comp?.category}</TextBlock>
                </CardBlock>

                <CardBlock
                    className="flex justify-between gap-2 min-w-fit max-w-lg"
                >
                    <TextBlock> <BiCategory />   </TextBlock>
                    <TextBlock> {comp?.subcategory}</TextBlock>
                </CardBlock>



                <CardBlock
                    className="flex justify-between gap-2 min-w-fit max-w-lg"
                >
                    <TextBlock> <TbResize />   </TextBlock>
                    <TextBlock> {comp?.size}</TextBlock>
                </CardBlock>


            </CardBlock>



            <CardBlock
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-700/50 to-slate-900/50  rounded-xl p-2"
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
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-500/50 to-slate-700/50  rounded-xl"
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
                    className="text-sky-200"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.avail?.btrade}
                </TextBlock>
                <TextBlock
                    className="text-green-500"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.price?.btrade}
                </TextBlock>
            </CardBlock>


            <CardBlock
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-500/50 to-slate-700/50  rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.yumiLink) window.open(comp?.competitorsLinks?.yumiLink) }}
                    className={`cursor-pointer  rounded-xl p-2 
                      ${comp?.competitorsLinks?.yumiLink ? "hover:bg-amber-500 bg-gradient-to-b from-amber-500/50 to-amber-900/50" : "text-gray-400"} 
                        `}
                >
                    Yumi
                </TextBlock>
                <TextBlock
                    className="text-sky-200"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.avail?.yumi}
                </TextBlock>
                <TextBlock
                    className="text-green-500"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.price?.yumi}
                </TextBlock>
            </CardBlock>


            <CardBlock
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-500/50 to-slate-700/50  rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.sharteLink) window.open(comp?.competitorsLinks?.sharteLink) }}
                    className={` rounded-xl p-2 
                     ${comp?.competitorsLinks?.sharteLink ? "cursor-pointer  bg-gradient-to-b from-blue-500/50 to-blue-900/50 hover:bg-blue-500" : "text-gray-400"}  
                        `}
                >
                    Sharte
                </TextBlock>

                <TextBlock
                    className="text-sky-200"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.avail?.sharte === "N/A" ? "N/A" : comp?.avail?.sharte ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.price?.sharte}
                </TextBlock>
            </CardBlock>




            <CardBlock
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-500/50 to-slate-700/50  rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.airLink) window.open(comp?.competitorsLinks?.airLink) }}
                    className={`  rounded-xl p-2 
                     ${comp?.competitorsLinks?.airLink ? "cursor-pointer bg-gradient-to-b from-green-500/50 to-green-900/50 hover:bg-green-500" : "text-gray-400"}   
                        `}
                >
                    Air
                </TextBlock>

                <TextBlock
                    className="text-sky-200"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.avail?.air === "N/A" ? "N/A" : comp?.avail?.air ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.price?.air}
                </TextBlock>
            </CardBlock>

            <CardBlock
                className="grid grid-cols-3  gap-2 bg-gradient-to-b from-slate-500/50 to-slate-700/50  rounded-xl"
            >
                <TextBlock
                    onClick={() => { if (comp?.competitorsLinks?.bestLink) window.open(comp?.competitorsLinks?.bestLink) }}
                    className={`  rounded-xl p-2 
                      ${comp?.competitorsLinks?.bestLink ? "cursor-pointer bg-gradient-to-b from-pink-500/50 to-pink-900/50 hover:bg-pink-500" : "text-gray-400"}  
                        `}
                >
                    Best
                </TextBlock>

                <TextBlock
                    className="text-sky-200"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.avail?.best === "N/A" ? "N/A" : comp?.avail?.best ? '✅' : '❌'}
                </TextBlock>



                <TextBlock
                    className="text-green-500"
                >
                    {isGettingUpdateCompByArtikul ? <Spinner color='rgb(217 70 239)' /> : comp?.price?.best}
                </TextBlock>
            </CardBlock>



        </ContainerBlock>
    )
}

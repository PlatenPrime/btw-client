import React from 'react'
import CardBlock from '../blocks/CardBlock';
import ImageArt from '../Image/ImageArt';
import TextBlock from '../blocks/TextBlock';
import useFetchArts from '../../../hooks/useFetchArts';

export default function ArtBlock({
    artikul,

}) {


const {artsDB, loadingArtsDB, errorArtsDB} = useFetchArts()


const art = artsDB?.find(art => art.artikul === artikul)


    return (
        <CardBlock
            className="lg:col-span-3 flex "
        >
            <CardBlock
                className="lg:col-span-1 bg-white flex justify-center items-center rounded-l-lg rounded-r-none"
            >
                <ImageArt size={100} artikul={artikul} className="rounded-l-lg" />

            </CardBlock>


            <CardBlock
                className=" w-full flex flex-col items-center justify-center px-2 
        bg-gradient-to-b from-sky-500/50 to-sky-700/50
        hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-500
         cursor-pointer rounded-r-xl rounded-l-none "

                onClick={() => {
                    const artId = artsDB?.find(art => art.artikul === artikul)?._id || "";
                    const url = `/arts/${artId}`;
                    window.open(url, "_blank");
                }}
            >

                <TextBlock
                    className=" justify-center text-3xl"
                >

                    {artikul}
                </TextBlock>

                <TextBlock
                    className=" justify-center items-center w-full text-center text-base italic"
                >

                    {art?.nameukr?.slice(10)}
                </TextBlock>

            </CardBlock>


        </CardBlock>
    )
}

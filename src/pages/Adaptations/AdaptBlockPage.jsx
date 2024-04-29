import React from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'

import { useNavigate, useParams } from 'react-router-dom'
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';
import AdaptSpinnerContainer from './components/AdaptSpinnerContainer';
import useInsStore from '../Instructions/stores/insStore';
import InsContainer from '../Instructions/components/InsContainer';
import YoutubeCard from '../../components/UI/YoutubeCard/YoutubeCard';






export default function AdaptBlockPage() {

    const { id } = useParams()
    const navigate = useNavigate();

    const { adaptBlock, getAdaptBlockById } = useAdaptBlocksStore();
    const { instruction, getInstructionById } = useInsStore();


    console.log(adaptBlock, 'adaptBlock');

    console.log(instruction, 'instruction');



    const [isLoadingAdaptBlock, setIsLoadingAdaptBlock] = useState(true);



    useEffect(() => {


        const fetchAdaptBlockById = async () => {
            try {
                setIsLoadingAdaptBlock(true)
                const fetchedAdaptBlock = await getAdaptBlockById(id)

                if (fetchedAdaptBlock) {

                    await getInstructionById(fetchedAdaptBlock.insId)
                }


            } catch (error) {
                console.log(error);

            } finally {
                setIsLoadingAdaptBlock(false)
            }
        }



        fetchAdaptBlockById()



    }, [id, getAdaptBlockById, getInstructionById])







    if (isLoadingAdaptBlock) {
        return (
            <PageBTW>
                <HeaderBlock
                    className=" text-transparent"
                >
                    Блок адаптації
                </HeaderBlock>

                <AdaptSpinnerContainer />
            </PageBTW >
        )

    }







    return (
        <PageBTW>
            <HeaderBlock
                className="bg-lime-500 shadow-2xl shadow-lime-500"
            >
                Блок адаптації
            </HeaderBlock>



            <ButtonGroup>

                <>
                    <ButtonBlock>
                        Редагувати
                    </ButtonBlock>
                    <ButtonBlock>
                        Видалити
                    </ButtonBlock>
                </>


                <>
                   
                </>

            </ButtonGroup>


            {/* MODALS */}


            {/* MODALS END */}





            <ContainerBlock
                className="space-y-4"
            >



                <TextBlock
                    className="font-bold text-2xl w-full bg-blue-500 rounded-xl p-4"
                >

                    {instruction?.title}
                </TextBlock>

                {instruction?.videoUrl &&

                    <YoutubeCard url={instruction?.videoUrl} />
                }



                {instruction?.body
                    ?
                    <InsContainer

                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: instruction?.body
                            }} >

                        </div>
                    </InsContainer>
                    :
                    <TextBlock className="text-xl italic text-slate-500"  >Текст інструкції відсутній</TextBlock>
                }
            </ContainerBlock>




            <ContainerBlock
                className="p-4"
            >
                <ButtonBlock
                    className="lime-b w-full"
                >
                    Перейти до наступного блоку
                </ButtonBlock>
            </ContainerBlock>





        </PageBTW >

    )
}

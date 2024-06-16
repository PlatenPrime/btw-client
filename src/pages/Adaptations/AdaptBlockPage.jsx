import React from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'

import { useNavigate, useParams } from 'react-router-dom'
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';
import AdaptSpinnerContainer from './components/AdaptSpinnerContainer';
import useInsStore from '../Instructions/stores/insStore';
import InsBodyContainer from '../Instructions/components/InsBodyContainer';
import YoutubeCard from '../../components/UI/YoutubeCard/YoutubeCard';
import useFetchAdaptBlockById from './hooks/useFetchAdaptBlockById';
import { CancelIcon, DeleteIcon, OkIcon } from '../../components/UI/Icons';






export default function AdaptBlockPage() {

    const { id } = useParams()
    const navigate = useNavigate();

    const { adaptBlock, instruction, isAdaptBlockLoading, error } = useFetchAdaptBlockById(id);




    return (
        <PageBTW
            isLoading={isAdaptBlockLoading}
        >
            <HeaderBlock
                className="bg-cyan-500 shadow-lg shadow-cyan-500"
            >
                Блок адаптації
            </HeaderBlock>



            <ButtonGroup>

                <ButtonGroup.Actions>

                    <ButtonBlock
                        className="red-b"
                    >
                        <DeleteIcon /> Видалити
                    </ButtonBlock>

                    <ButtonBlock
                        className="green-b"
                    >
                        <OkIcon /> Позначити пройденим
                    </ButtonBlock>

                    <ButtonBlock
                        className="rose-b"
                    >
                        <CancelIcon /> Позначити непройденим
                    </ButtonBlock>


                </ButtonGroup.Actions>



                <ButtonGroup.Navigation>

                </ButtonGroup.Navigation>


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
                    <InsBodyContainer

                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: instruction?.body
                            }} >

                        </div>
                    </InsBodyContainer>
                    :
                    <TextBlock className="text-xl italic text-slate-500"  >Текст інструкції відсутній</TextBlock>
                }
            </ContainerBlock>




        </PageBTW >

    )
}

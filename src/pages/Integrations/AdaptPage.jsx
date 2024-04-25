import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useParams } from 'react-router-dom';
import useAdaptsStore from './stores/adaptsStore';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AdaptPage() {

    const { id } = useParams();

    const { adapt, getAdaptById, updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { adaptBlocks, getAdaptBlocksByAdaptId } = useAdaptBlocksStore();



    const [isAdaptLoading, setIsAdaptLoading] = useState(false);
    const [isAdaptEditing, setIsAdaptEditing] = useState(false);









    useEffect(() => {

        const fetchAdaptById = async () => {
            try {
                setIsAdaptLoading(true);
                await getAdaptById(id)
                await getAdaptBlocksByAdaptId(id)
            } catch (error) {
                console.error('Помилка завантаження інтеграції:', error);
            } finally {
                setIsAdaptLoading(false);
            }
        }

        fetchAdaptById()

    }, [getAdaptById, id, getAdaptBlocksByAdaptId]);








    return (
        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Інтеграція
            </HeaderBlock>







            {isAdaptLoading ?
                (
                    <ContainerBlock
                        className="w-full h-full flex justify-start items-center"
                    >
                        <Spinner color="rgb(34 197 94)" />
                    </ContainerBlock>
                )
                :
                (
                    <>

                        <ButtonGroup>


                            {isAdaptEditing
                                ?
                                <>
                                    <ButtonBlock
                                        className="rose-b"
                                        onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                                    >
                                        Скасувати
                                    </ButtonBlock>

                                    <ButtonBlock>
                                        Зберегти
                                    </ButtonBlock>

                                </>
                                :
                                <ButtonBlock
                                    onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                                    className="blue-b"
                                >
                                    Редагувати
                                </ButtonBlock>

                            }




                            <ButtonBlock>
                                Видалити
                            </ButtonBlock>

                        </ButtonGroup>





                        {isAdaptEditing

                            ?

                            <ContainerBlock
                                className="bg-blue-500/10 "
                            >
                                <TextBlock
                                    className=" text-3xl"
                                >
                                    Інтеграція в режимі редагування
                                </TextBlock>


                                <ContainerBlock>
                                    <ButtonBlock
                                        className="w-full slate-b bg-transparent hover:bg-slate-500/10 rounded-3xl border-4 border-dashed  p-4"
                                    >
                                        Додати блок
                                    </ButtonBlock>
                                </ContainerBlock>





                            </ContainerBlock>


                            :




                            <ContainerBlock
                                className="bg-green-500/10 "
                            >
                                <TextBlock
                                    className=" text-3xl"
                                >
                                    {adapt?.title}
                                </TextBlock>

                                <ContainerBlock
                                    className="space-y-4"
                                >

                                    <TextBlock
                                        className=" text-2xl"
                                    >
                                        Блоки
                                    </TextBlock>


                                    {adaptBlocks?.map((adaptBlock) => (

                                        <CardBlock
                                            key={adaptBlock._id}
                                            className="w-full rounded-3xl border-4  border-green-500/50 p-4 "
                                        >
                                            <TextBlock
                                                className=" text-2xl"
                                            >
                                                {adaptBlock?.title}
                                            </TextBlock>
                                        </CardBlock>
                                    ))}



                                </ContainerBlock>
                            </ContainerBlock>
                        }























                    </>
                )}


        </PageBTW >
    )
}

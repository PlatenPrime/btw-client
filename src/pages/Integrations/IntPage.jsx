import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useParams } from 'react-router-dom';
import useIntsStore from './stores/IntsStore';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IntPage() {

    const { id } = useParams();

    const { int, getIntById, updateIntById, deleteIntById } = useIntsStore();



    const [isIntLoading, setIsIntLoading] = useState(false);
    const [isIntEditing, setIsIntEditing] = useState(false);









    useEffect(() => {

        const fetchIntById = async () => {
            try {
                setIsIntLoading(true);
                await getIntById(id)
            } catch (error) {
                console.error('Помилка завантаження інтеграції:', error);
            } finally {
                setIsIntLoading(false);
            }
        }

        fetchIntById()

    }, [getIntById, id]);








    return (
        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Інтеграція
            </HeaderBlock>







            {isIntLoading ?
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


                            {isIntEditing
                                ?
                                <>
                                    <ButtonBlock
                                        className="rose-b"
                                        onClick={() => setIsIntEditing(!isIntEditing)}
                                    >
                                        Скасувати
                                    </ButtonBlock>

                                    <ButtonBlock>
                                        Зберегти
                                    </ButtonBlock>

                                </>
                                :
                                <ButtonBlock
                                    onClick={() => setIsIntEditing(!isIntEditing)}
                                    className="blue-b"
                                >
                                    Редагувати
                                </ButtonBlock>

                            }




                            <ButtonBlock>
                                Видалити
                            </ButtonBlock>

                        </ButtonGroup>





                        {isIntEditing ?

                            <ContainerBlock
                                className="bg-blue-500/10 "
                            >
                                <TextBlock
                                    className=" text-3xl"
                                >
                                    Інтеграція в режимі редагування
                                </TextBlock>
                            </ContainerBlock>
                            :
                            <ContainerBlock
                                className="bg-green-500/10 "
                            >
                                <TextBlock
                                    className=" text-3xl"
                                >
                                    {int?.title}
                                </TextBlock>
                            </ContainerBlock>
                        }























                    </>
                )}


        </PageBTW >
    )
}

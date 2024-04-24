import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useParams } from 'react-router-dom';
import useIntsStore from './stores/IntsStore';
import useIntBlocksStore from './stores/IntBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IntPage() {

    const { id } = useParams();

    const { int, getIntById, updateIntById, deleteIntById } = useIntsStore();
    const { intBlocks, getIntBlocksByIntId } = useIntBlocksStore();



    const [isIntLoading, setIsIntLoading] = useState(false);
    const [isIntEditing, setIsIntEditing] = useState(false);









    useEffect(() => {

        const fetchIntById = async () => {
            try {
                setIsIntLoading(true);
                await getIntById(id)
                await getIntBlocksByIntId(id)
            } catch (error) {
                console.error('Помилка завантаження інтеграції:', error);
            } finally {
                setIsIntLoading(false);
            }
        }

        fetchIntById()

    }, [getIntById, id, getIntBlocksByIntId]);








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





                        {isIntEditing

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
                                    {int?.title}
                                </TextBlock>

                                <ContainerBlock
                                    className="space-y-4"
                                >

                                    <TextBlock
                                        className=" text-2xl"
                                    >
                                        Блоки
                                    </TextBlock>


                                    {intBlocks?.map((intBlock) => (

                                        <CardBlock
                                            key={intBlock._id}
                                            className="w-full rounded-3xl border-4  border-green-500/50 p-4 "
                                        >
                                            <TextBlock
                                                className=" text-2xl"
                                            >
                                                {intBlock?.title}
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

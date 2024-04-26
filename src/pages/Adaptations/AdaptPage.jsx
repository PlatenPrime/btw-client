import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useParams } from 'react-router-dom';
import useAdaptsStore from './stores/adaptsStore';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';
import useInsStore from '../Instructions/stores/insStore';
import useInsFoldersStore from '../Instructions/stores/insFoldersStore';

export default function AdaptPage() {

    const { id } = useParams();

    const { adapt, getAdaptById, updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { oneAdaptBlocks, getAdaptBlocksByAdaptId } = useAdaptBlocksStore();
    const { instructions, getAllInstructions } = useInsStore();
    const { insFolders, getAllInsFolders } = useInsFoldersStore();



    const [isAdaptLoading, setIsAdaptLoading] = useState(false);
    const [isInstructionsLoading, setIsInstructionsLoading] = useState(false);



    const [isAdaptEditing, setIsAdaptEditing] = useState(false);
    const [isNewAdaptBlockEditing, setIsNewAdaptBlockEditing] = useState(false);

    const [isNewAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)




    console.log(insFolders);





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




    useEffect(() => {

        const fetchInstructions = async () => {
            try {
                setIsInstructionsLoading(true);
                await getAllInstructions()
                await getAllInsFolders()
            } catch (error) {
                console.error('Помилка завантаження інтеграції:', error);
            } finally {
                setIsInstructionsLoading(false);
            }
        }

        fetchInstructions()

    }, [getAllInstructions, getAllInsFolders]);







    return (
        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Адаптація
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
                                    Адаптація в режимі редагування
                                </TextBlock>


                                <ContainerBlock
                                    className="space-y-4 "
                                >

                                    <TextBlock
                                        className=" text-2xl"
                                    >
                                        Блоки
                                    </TextBlock>



                                    {oneAdaptBlocks?.map((adaptBlock) => (

                                        <CardBlock
                                            key={adaptBlock._id}
                                            className="w-full rounded-3xl border-4  border-green-500/50 p-4 "
                                        >
                                            <TextBlock
                                                className=" text-2xl"
                                            >
                                                {adaptBlock?.title}
                                            </TextBlock>

                                            <TextBlock
                                                className=" text-2xl"
                                            >

                                                Інструкція: {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}
                                            </TextBlock>

                                        </CardBlock>
                                    ))}


                                    {isNewAdaptBlockEditing ?
                                        <CardBlock
                                            className="w-full rounded-xl  border-4 border-dashed  border-green-500/20 p-4 space-y-4 "
                                        >

                                            <TextBlock
                                                className=" text-3xl"
                                            >
                                                Форма для нового блоку
                                            </TextBlock>

                                            <CardBlock>
                                                <select
                                                    className="InputBlock w-full text-xl"
                                                    name="insId"

                                                >

                                                    {insFolders?.map((insfolder) => (
                                                        <optgroup
                                                            key={insfolder?._id}
                                                            label={insfolder?.title}
                                                            className="text-2xl bg-yellow-500 "
                                                        >

                                                            {instructions?.filter((ins) => insfolder?._id === ins?.folderId).map((ins) => (
                                                                <option
                                                                    key={ins?._id}
                                                                    value={ins?._id}
                                                                    className="bg-green-500"
                                                                    onChange={(e) => setNewAdaptBlockInsId(e.target.value)}
                                                                >

                                                                    {ins?.title}
                                                                </option>
                                                            ))}

                                                        </optgroup>
                                                    ))}


                                                </select>
                                            </CardBlock>

                                            <CardBlock
                                                className="flex justify-around space-x-4"
                                            >
                                                <ButtonBlock
                                                    className="rose-b"
                                                    onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                                                >
                                                    Скасувати
                                                </ButtonBlock>
                                                <ButtonBlock>
                                                    Створити
                                                </ButtonBlock>

                                            </CardBlock>



                                        </CardBlock>
                                        :

                                        <ButtonBlock
                                            className="w-full slate-b bg-transparent hover:bg-slate-500/10 rounded-3xl border-4 border-dashed  p-4"
                                            onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                                        >
                                            Додати блок
                                        </ButtonBlock>
                                    }








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


                                    {oneAdaptBlocks?.map((adaptBlock) => (

                                        <CardBlock
                                            key={adaptBlock._id}
                                            className="w-full rounded-3xl border-4  border-green-500/50 p-4 space-y-4"
                                        >
                                            <TextBlock
                                                className=" text-2xl"
                                            >
                                                {adaptBlock?.title}
                                            </TextBlock>
                                            <TextBlock
                                                className=" text-2xl"
                                            >

                                                Інструкція: {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}
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

import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalDelete, PageBTW, Spinner, TextBlock } from '../../components'
import { useNavigate, useParams } from 'react-router-dom';
import useAdaptsStore from './stores/adaptsStore';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useEffect } from 'react';
import { useState } from 'react';
import useInsStore from '../Instructions/stores/insStore';
import useInsFoldersStore from '../Instructions/stores/insFoldersStore';
import { CancelIcon, OkIcon } from '../../components/UI/Icons';

export default function AdaptPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { adapt, getAdaptById, updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { oneAdaptBlocks, getAdaptBlocksByAdaptId, createAdaptBlock } = useAdaptBlocksStore();
    const { instructions, getAllInstructions } = useInsStore();
    const { insFolders, getAllInsFolders } = useInsFoldersStore();



    const [isAdaptLoading, setIsAdaptLoading] = useState(false);
    const [isInstructionsLoading, setIsInstructionsLoading] = useState(false);



    const [isAdaptEditing, setIsAdaptEditing] = useState(false);
    const [isNewAdaptBlockEditing, setIsNewAdaptBlockEditing] = useState(false);

    const [newAdaptBlockTitle, setNewAdaptBlockTitle] = useState('')
    const [newAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)


    const [isShowAdaptDeleteModal, setIsShowAdaptDeleteModal] = useState(false);


    const [isAdaptDeleting, setIsAdaptDeleting] = useState(false);

    const [isAdaptBlockCreating, setIsAdaptBlockCreating] = useState(false);











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









    const handleDeleteAdapt = async () => {
        try {
            setIsAdaptDeleting(true)
            await deleteAdaptById(adapt?._id)
            navigate("/adapts")

        } catch (error) {
            console.log(error);

        } finally {
            setIsAdaptDeleting(false)
            setIsShowAdaptDeleteModal(false)

        }
    }













    const handleCreateAdaptBlock = async (createData) => {
        try {
            setIsAdaptBlockCreating(true)

            await createAdaptBlock(createData)




        } catch (error) {
            console.log(error);

        } finally {
            setIsAdaptBlockCreating(false)
            setIsNewAdaptBlockEditing(false)
            setNewAdaptBlockInsId(null)
            setNewAdaptBlockTitle('')
        }
    }











    return (
        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Адаптація
            </HeaderBlock>



            {/* MODALS */}

            {isShowAdaptDeleteModal &&
                <ModalDelete
                    ask="Ви впевнені, що хочете видалити адаптацію?"
                    onDelete={() => handleDeleteAdapt()}
                    onCancel={() => setIsShowAdaptDeleteModal(false)}
                    isDeleting={isAdaptDeleting}
                />
            }



            {/* MODALS END */}

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
                                        className="pink-b"
                                        onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                                    >
                                        Скасувати
                                    </ButtonBlock>

                                    <ButtonBlock
                                        className="emerald-b"
                                        onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                                    >
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




                            <ButtonBlock
                                className="red-b"
                                onClick={() => setIsShowAdaptDeleteModal(true)}
                            >
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



                                    {oneAdaptBlocks?.map((adaptBlock, i) => (

                                        <CardBlock
                                            key={adaptBlock._id}
                                            className="  w-full rounded-3xl bg-green-500/20 p-2 space-y-4 "
                                        >
                                            <TextBlock
                                                className=" text-2xl w-full bg-green-500 rounded-xl"
                                            >
                                                {i + 1}. {adaptBlock?.title}
                                            </TextBlock>


                                            <CardBlock
                                                className="flex space-x-4"
                                            >

                                                <img
                                                    src={instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.titleImage
                                                        || 'https://placehold.co/600x400?text=Інструкція'
                                                    }
                                                    width={200}
                                                    className="rounded-3xl"
                                                >

                                                </img>

                                                <TextBlock
                                                    className=" text-xl"
                                                >



                                                    Інструкція: {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}


                                                </TextBlock>


                                            </CardBlock>

                                        </CardBlock>
                                    ))}






                                    {isNewAdaptBlockEditing
                                        ?



                                        <CardBlock
                                            className="w-full rounded-xl bg-green-500/5  border-4 border-dashed  border-green-500/20 p-4 space-y-4 "
                                        >

                                            <TextBlock
                                                className=" text-2xl bg-green-500/5"
                                            >
                                                Форма для нового блоку
                                            </TextBlock>



                                            <CardBlock
                                                className="flex items-center space-x-4"
                                            >
                                                <label>
                                                    <TextBlock className=" text-xl whitespace-nowrap">
                                                        Назва блоку:
                                                    </TextBlock>
                                                </label>

                                                <InputBlock
                                                    onChange={(e) => setNewAdaptBlockTitle(e.target.value)}
                                                    value={newAdaptBlockTitle}
                                                    className="w-full"

                                                />
                                            </CardBlock>




                                            <CardBlock
                                                className="flex items-center space-x-4"
                                            >

                                                <label>
                                                    <TextBlock className=" text-xl">
                                                        Інструкція:
                                                    </TextBlock>
                                                </label>


                                                <select
                                                    className="InputBlock w-full "
                                                    name="insId"
                                                    onChange={(e) => setNewAdaptBlockInsId(e.target.value)}
                                                >

                                                    <option
                                                        className="bg-blue-500 text-white"
                                                        value=""
                                                        disabled
                                                    >
                                                        Вибери інструкцію
                                                    </option>

                                                    {insFolders?.map((insfolder) => (
                                                        <optgroup
                                                            key={insfolder?._id}
                                                            label={insfolder?.title}
                                                            className=" bg-slate-900 text-slate-500 "
                                                        >

                                                            {instructions?.filter((ins) => insfolder?._id === ins?.folderId).map((ins) => (
                                                                <option
                                                                    key={ins?._id}
                                                                    value={ins?._id}
                                                                    className="text-white"

                                                                >

                                                                    {ins?.title}
                                                                </option>
                                                            ))}

                                                        </optgroup>
                                                    ))}


                                                </select>
                                            </CardBlock>




                                            {newAdaptBlockInsId

                                                ?
                                                <CardBlock
                                                    className="flex space-x-4 bg-blue-500/10 p-2 rounded-xl"
                                                >

                                                    <img
                                                        src={instructions?.find((ins) => ins?._id === newAdaptBlockInsId)?.titleImage
                                                            || 'https://placehold.co/600x400?text=Інструкція'
                                                        }
                                                        width={200}
                                                        className="rounded-3xl"
                                                    >

                                                    </img>

                                                    <TextBlock
                                                        className=" text-2xl"
                                                    >



                                                        Інструкція: {instructions?.find((ins) => ins?._id === newAdaptBlockInsId)?.title}


                                                    </TextBlock>


                                                </CardBlock>
                                                :
                                                null
                                            }










                                            <CardBlock
                                                className="flex justify-around space-x-4"
                                            >
                                                <ButtonBlock
                                                    className="rose-b flex justify-center items-center"
                                                    onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                                                >

                                                    <TextBlock className="text-2xl"><CancelIcon /></TextBlock>
                                                    <TextBlock className=""> Скасувати</TextBlock>

                                                </ButtonBlock>

                                                <ButtonBlock
                                                    onClick={() => handleCreateAdaptBlock({
                                                        title: newAdaptBlockTitle,
                                                        insId: newAdaptBlockInsId,
                                                        adaptId: adapt?._id
                                                    })}
                                                    className="green-b flex justify-center items-center"
                                                    disabled={!newAdaptBlockTitle || !newAdaptBlockInsId}

                                                >
                                                    {isAdaptBlockCreating ?
                                                        <Spinner color="rgb(134 239 172)" />
                                                        :
                                                        <>
                                                            <TextBlock className="text-2xl"><OkIcon /></TextBlock>
                                                            <TextBlock className="">  Створити</TextBlock>
                                                        </>}

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

                                    {oneAdaptBlocks?.map((adaptBlock, i) => (

                                        <CardBlock
                                            key={adaptBlock._id}
                                            className="  w-full rounded-3xl bg-green-500/20 p-2 space-y-4 "
                                        >
                                            <TextBlock
                                                className=" text-2xl w-full bg-green-500 rounded-xl"
                                            >
                                                {i + 1}. {adaptBlock?.title}
                                            </TextBlock>


                                            <CardBlock
                                                className="flex space-x-4"
                                            >

                                                <img
                                                    src={instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.titleImage
                                                        || 'https://placehold.co/600x400?text=Інструкція'
                                                    }
                                                    width={200}
                                                    className="rounded-3xl"
                                                >

                                                </img>

                                                <TextBlock
                                                    className=" text-xl"
                                                >



                                                    Інструкція: {instructions?.find((ins) => ins?._id === adaptBlock?.insId)?.title}


                                                </TextBlock>


                                            </CardBlock>

                                        </CardBlock>
                                    ))}




                                </ContainerBlock>
                            </ContainerBlock>
                        }























                    </>
                )
            }


        </PageBTW >
    )
}

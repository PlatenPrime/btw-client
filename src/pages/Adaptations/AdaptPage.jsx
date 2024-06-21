import React, { useEffect } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalConfirm, ModalDelete, PageBTW, TextBlock } from '../../components'
import { useNavigate, useParams } from 'react-router-dom';
import useAdaptsStore from './stores/adaptsStore';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useState } from 'react';
import AddNewBlockForm from './components/AddNewBlockForm';
import AdaptBlockBage from './components/AdaptBlockBage';
import useFetchAdaptById from './hooks/useFetchAdaptById';
import useFetchAllIns from '../Instructions/hooks/useFetchAllIns';
import useFetchAllInsFolders from '../Instructions/hooks/useFetchAllInsFolders';
import useFetchUsers from '../Auth/hooks/useFetchUsers';


import { AddIcon, CancelIcon, DeleteIcon, EditIcon, OkIcon } from '../../components/UI/Icons';

import { Reorder } from 'framer-motion';





export default function AdaptPage() {

    const { id } = useParams();
    const navigate = useNavigate();


    console.log("Render");





    const { adapt, oneAdaptBlocks, isAdaptLoading, error } = useFetchAdaptById(id);
    const { instructions, isAllInsLoading } = useFetchAllIns();
    const { insFolders, isAllInsFoldersLoading } = useFetchAllInsFolders()
    const { user, users } = useFetchUsers()


    const { updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { createAdaptBlock } = useAdaptBlocksStore();

    const [isAdaptEditing, setIsAdaptEditing] = useState(false);
    const [isNewAdaptBlockEditing, setIsNewAdaptBlockEditing] = useState(false);
    const [isShowAdaptDeleteModal, setIsShowAdaptDeleteModal] = useState(false);
    const [isAdaptDeleting, setIsAdaptDeleting] = useState(false);
    const [isShowAdaptUpdateModal, setIsShowAdaptUpdateModal] = useState(false);
    const [isAdaptUpdating, setIsAdaptUpdating] = useState(false);
    const [isAdaptBlockCreating, setIsAdaptBlockCreating] = useState(false);



    const [items, setItems] = useState(oneAdaptBlocks);
    console.log(items);


    useEffect(() => {
        setItems(oneAdaptBlocks)
    }, [oneAdaptBlocks])



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

        }
    }



    const handleUpdateAdapt = async () => {
        try {
            setIsAdaptUpdating(true)
            const updateData = {
                blocks: items
            }
            await updateAdaptById(adapt?._id, updateData)
        } catch (error) {
            console.log(error);
        } finally {
            setIsAdaptUpdating(false)
            setIsShowAdaptUpdateModal(false)
        }
    }








    return (


        <PageBTW
            isLoading={isAdaptLoading}
        >
            <HeaderBlock
                className="bg-green-500 shadow-lg shadow-green-500"
            >
                {adapt?.title}
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


            {

                isShowAdaptUpdateModal &&
                <ModalConfirm
                    ask="Зберегти зміни?"
                    onConfirm={() => handleUpdateAdapt()}
                    onCancel={() => setIsShowAdaptUpdateModal(false)}
                    isConfirming={isAdaptUpdating}

                />
            }



            {/* MODALS END */}



            {/* BUTTON GROUP*/}



            <ButtonGroup>


                <ButtonGroup.Navigation
                >

                    {adapt?.test && <ButtonBlock
                        onClick={() => navigate(`/adapts/tests/${adapt?.test}`)}
                        className="purple-b-n"
                        disabled={!adapt?.test}
                    >
                        Пройти тест
                    </ButtonBlock>}

                </ButtonGroup.Navigation>


                <ButtonGroup.Actions
                >
                    {isAdaptEditing
                        ?
                        <>
                            <ButtonBlock
                                className="pink-b"
                                onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                            >
                                <CancelIcon />
                                Скасувати
                            </ButtonBlock>

                            <ButtonBlock
                                className="emerald-b"
                                onClick={() => {
                                    setIsShowAdaptUpdateModal(true)
                                    setIsAdaptEditing(false)
                                }}
                            >
                                <OkIcon />
                                Зберегти
                            </ButtonBlock>

                            <ButtonBlock
                                className="red-b"
                                onClick={() => setIsShowAdaptDeleteModal(true)}
                            >
                                <DeleteIcon />  Видалити
                            </ButtonBlock>

                        </>
                        :
                        <ButtonBlock
                            onClick={() => setIsAdaptEditing(!isAdaptEditing)}
                            className="blue-b"
                        >
                            <EditIcon /> Редагувати
                        </ButtonBlock>

                    }


                    {!adapt?.test && <ButtonBlock

                        className="purple-b"

                    >
                        <AddIcon />  Створити тест
                    </ButtonBlock>
                    }



                </ButtonGroup.Actions>

            </ButtonGroup>

            {/* BUTTON GROUP  END*/}



            <ContainerBlock
                className="space-y-4 p-4 "

            >

                {oneAdaptBlocks?.length === 0 && <TextBlock className="text-green-100 text-xl italic">Адаптаційні блоки відсутні</TextBlock>}


                {isAdaptEditing &&
                    <AddNewBlockForm
                        isAdaptEditing={isAdaptEditing}
                        adapt={adapt}
                        insFolders={insFolders}
                        instructions={instructions}
                        isAdaptBlockCreating={isAdaptBlockCreating}
                        isNewAdaptBlockEditing={isNewAdaptBlockEditing}
                        setIsNewAdaptBlockEditing={setIsNewAdaptBlockEditing}
                        handleCreateAdaptBlock={handleCreateAdaptBlock}
                        users={users}
                    />
                }



                <Reorder.Group values={items} onReorder={setItems}>
                    {items?.map((adaptBlock, i) => (
                        <AdaptBlockBage
                            key={adaptBlock._id}
                            adaptBlock={adaptBlock}
                            i={i}
                            instructions={instructions}
                            isAdaptEditing={isAdaptEditing}
                            user={user}
                        />

                    ))}
                </Reorder.Group>

            </ContainerBlock>




        </PageBTW >
    )
}

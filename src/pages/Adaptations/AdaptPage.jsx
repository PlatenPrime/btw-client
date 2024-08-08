import React, { useEffect } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalConfirm, ModalCreate, ModalDelete, PageBTW, TextBlock } from '../../components'
import { useNavigate, useParams } from 'react-router-dom';
import useAdaptsStore from './stores/adaptsStore';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import { useState } from 'react';
import AddNewBlockForm from './components/AddNewBlockForm/AddNewBlockForm';
import AdaptBlockBage from './components/AdaptBlockBage';
import useFetchAdaptById from './hooks/useFetchAdaptById';
import useFetchAllIns from '../Instructions/hooks/useFetchAllIns';
import useFetchAllInsFolders from '../Instructions/hooks/useFetchAllInsFolders';
import useFetchUsers from '../Auth/hooks/useFetchUsers';


import { AddIcon, CancelIcon, DeleteIcon, EditIcon, OkIcon, TestIcon } from '../../components/UI/Icons';

import { Reorder } from 'framer-motion';
import useTestsStore from './stores/adaptTestsStore';





export default function AdaptPage() {

    const { id } = useParams();
    const navigate = useNavigate();


    console.log("Render");





    const { adapt, oneAdaptBlocks, isAdaptLoading, error } = useFetchAdaptById(id);
    const { instructions, isAllInsLoading } = useFetchAllIns();
    const { insFolders, isAllInsFoldersLoading } = useFetchAllInsFolders()
    const { user, users } = useFetchUsers()


    const { updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { createTest } = useTestsStore();

    const [isAdaptEditing, setIsAdaptEditing] = useState(false);

    const [isShowAdaptDeleteModal, setIsShowAdaptDeleteModal] = useState(false);
    const [isAdaptDeleting, setIsAdaptDeleting] = useState(false);
    const [isShowAdaptUpdateModal, setIsShowAdaptUpdateModal] = useState(false);
    const [isAdaptUpdating, setIsAdaptUpdating] = useState(false);

    const [isShowTestCreateModal, setIsShowTestCreateModal] = useState(false);
    const [isTestCreating, setIsTestCreating] = useState(false);




    const [items, setItems] = useState(oneAdaptBlocks);
    console.log(items);


    useEffect(() => {
        setItems(oneAdaptBlocks)
    }, [oneAdaptBlocks])



    const handleDeleteAdapt = async () => {
        try {
            setIsAdaptDeleting(true)
            await deleteAdaptById({
                adaptId: adapt?._id,
                questions: []
            })
            navigate("/adapts")

        } catch (error) {
            console.log(error);

        } finally {
            setIsAdaptDeleting(false)
            setIsShowAdaptDeleteModal(false)

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


    const handleCreateTest = async () => {
        try {
            setIsTestCreating(true)
            const test = await createTest(adapt?._id)
            console.log(test);

        } catch (error) {
            console.log(error);

        } finally {
            setIsTestCreating(false)
            setIsShowTestCreateModal(false)
        }
    }








    const isReadyForTest = adapt?.test && oneAdaptBlocks?.every(block => block?.isDone[user?._id])


    return (


        <PageBTW
            isLoading={isAdaptLoading}
        >
            <HeaderBlock
                 className="bg-gradient-to-b  from-green-700/50  to-green-400 shadow-md shadow-green-500 "
            >
                {adapt?.title}
            </HeaderBlock>





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




            {isShowTestCreateModal && <ModalConfirm
                ask="Створити тест?"
                onConfirm={handleCreateTest}
                onCancel={() => setIsShowTestCreateModal(false)}
                isConfirming={isTestCreating}



            />}





            <ButtonGroup>


                <ButtonGroup.Navigation
                >

                    {adapt?.test && <ButtonBlock
                        onClick={() => navigate(`/adapts/tests/${adapt?.test}`)}
                        className="lime-b-n"
                        disabled={!isReadyForTest}
                    >
                        <TestIcon />  Тест
                    </ButtonBlock>}

                </ButtonGroup.Navigation>


                <ButtonGroup.Actions>



                    {isAdaptEditing
                        ?
                        <>
                            <ButtonBlock
                                className="fuchsia-b"
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
                        onClick={() => setIsShowTestCreateModal(true)}

                    >
                        <AddIcon />  Створити тест
                    </ButtonBlock>
                    }



                </ButtonGroup.Actions>

            </ButtonGroup>





            <ContainerBlock
                className="space-y-4 p-4 "

            >

                {oneAdaptBlocks?.length === 0 && <TextBlock className="text-green-100 text-xl italic">Адаптаційні блоки відсутні</TextBlock>}


                {isAdaptEditing &&
                    <AddNewBlockForm
                        adapt={adapt}
                        insFolders={insFolders}
                        instructions={instructions}
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

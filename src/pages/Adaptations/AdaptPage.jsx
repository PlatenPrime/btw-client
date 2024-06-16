import React from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalDelete, PageBTW, TextBlock } from '../../components'
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


import { CancelIcon, DeleteIcon, EditIcon, OkIcon } from '../../components/UI/Icons';





export default function AdaptPage() {

    const { id } = useParams();
    const navigate = useNavigate();


    const { adapt, oneAdaptBlocks, isAdaptLoading, error } = useFetchAdaptById(id);
    const { instructions, isAllInsLoading } = useFetchAllIns();
    const { insFolders, isAllInsFoldersLoading } = useFetchAllInsFolders()
    const {users} = useFetchUsers()





    const { updateAdaptById, deleteAdaptById } = useAdaptsStore();
    const { createAdaptBlock } = useAdaptBlocksStore();


    const [isAdaptEditing, setIsAdaptEditing] = useState(false);
    const [isNewAdaptBlockEditing, setIsNewAdaptBlockEditing] = useState(false);


    const [newAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)


    const [isShowAdaptDeleteModal, setIsShowAdaptDeleteModal] = useState(false);

    const [isAdaptDeleting, setIsAdaptDeleting] = useState(false);

    const [isAdaptBlockCreating, setIsAdaptBlockCreating] = useState(false);



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



            {/* MODALS END */}



            {/* BUTTON GROUP*/}



            <ButtonGroup>

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
                                onClick={() => setIsAdaptEditing(!isAdaptEditing)}
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



                </ButtonGroup.Actions>


                <ButtonGroup.Navigation
                >
                    <ButtonBlock>
                        Пройти тест
                    </ButtonBlock>
                </ButtonGroup.Navigation>


            </ButtonGroup>

            {/* BUTTON GROUP  END*/}



            <ContainerBlock
                className="space-y-4 p-4 "

            >

{oneAdaptBlocks?.length === 0 && <TextBlock className="text-green-100 text-2xl italic">Адаптаційні блоки відсутні</TextBlock>}






                {oneAdaptBlocks?.map((adaptBlock, i) => (
                    <AdaptBlockBage
                        adaptBlock={adaptBlock}
                        i={i}
                        instructions={instructions}
                        isAdaptEditing={isAdaptEditing}
                    />
                ))}





                {!isAdaptEditing ? null : isNewAdaptBlockEditing
                    ?

                    <AddNewBlockForm
                        adapt={adapt}
                        insFolders={insFolders}
                        instructions={instructions}
                        isAdaptBlockCreating={isAdaptBlockCreating}
                        isNewAdaptBlockEditing={isNewAdaptBlockEditing}
                        setIsNewAdaptBlockEditing={setIsNewAdaptBlockEditing}
                        handleCreateAdaptBlock={handleCreateAdaptBlock}
                       users={users}


                    />

                    :

                    <ButtonBlock
                        className="w-full green-b bg-transparent  rounded-3xl border-4 border-dashed hover:border-green-500  p-4"
                        onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                    >
                        Додати блок
                    </ButtonBlock>
                }


            </ContainerBlock>




        </PageBTW >
    )
}

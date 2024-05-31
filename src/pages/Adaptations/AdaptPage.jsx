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
import AdaptSpinnerContainer from './components/AdaptSpinnerContainer';
import AddNewBlockForm from './components/AddNewBlockForm';
import AdaptBlockBage from './components/AdaptBlockBage';





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


        <PageBTW
        isLoading={isAdaptLoading}
        >
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
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

                    />

                    :

                    <ButtonBlock
                        className="w-full slate-b bg-transparent hover:bg-slate-500/10 rounded-3xl border-4 border-dashed  p-4"
                        onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                    >
                        Додати блок
                    </ButtonBlock>
                }


            </ContainerBlock>




        </PageBTW >
    )
}

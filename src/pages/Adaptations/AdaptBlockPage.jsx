import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, ModalConfirm, ModalDelete, PageBTW } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchAdaptBlockById from './hooks/useFetchAdaptBlockById';
import { BackIcon, CancelIcon, DeleteIcon, OkIcon } from '../../components/UI/Icons';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import useAuthStore from '../Auth/authStore';
import AdaptBlockIns from './components/AdaptBlockIns';
import useFetchAdaptById from './hooks/useFetchAdaptById';


export default function AdaptBlockPage() {

    const { id } = useParams()
    const navigate = useNavigate();
    const { user } = useAuthStore()

    const { adaptBlock, oneAdaptBlocks, instruction, isAdaptBlockLoading, error: adaptBlockError } = useFetchAdaptBlockById(id);
  


    const { deleteAdaptBlockById, updateAdaptBlockIsDone } = useAdaptBlocksStore();

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isAdaptBlockDeleting, setIsAdaptBlockDeleting] = useState(false);

    const [isShowModalAdaptBlockIsDoneUpdate, setIsShowModalAdaptBlockIsDoneUpdate] = useState(false);
    const [isAdaptBlockIsDoneUpdating, setIsAdaptBlockIsDoneUpdating] = useState(false);


    console.log(oneAdaptBlocks);
    
    let indexOfBlock, prev, next

    if (Array.isArray(oneAdaptBlocks)) {
        indexOfBlock = oneAdaptBlocks?.findIndex(block => block?._id === adaptBlock?._id)
        prev = oneAdaptBlocks[indexOfBlock - 1]
        next = oneAdaptBlocks[indexOfBlock + 1]
    }






    const handleAdaptBlockDelete = async () => {
        try {
            setIsAdaptBlockDeleting(true);
            await deleteAdaptBlockById(adaptBlock._id);
            navigate(`/adapts/${adaptBlock.adaptId}`);

        } catch (error) {
            console.log(error);

        } finally {
            setIsAdaptBlockDeleting(false);
            setIsShowModalDelete(false);
        }
    }

    const handleAdaptBlockIsDoneUpdate = async () => {
        try {
            setIsAdaptBlockIsDoneUpdating(true);
            await updateAdaptBlockIsDone(adaptBlock?._id, user?._id, !adaptBlock?.isDone?.[user?._id]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsAdaptBlockIsDoneUpdating(false);
            setIsShowModalAdaptBlockIsDoneUpdate(false);
        }
    }


    if (adaptBlockError ) {
        return (
            <PageBTW>
                <HeaderBlock
                    className="bg-red-500 shadow-lg shadow-red-500"
                >
                    Блок адаптації
                </HeaderBlock>
                <p className="text-red-500">{adaptBlockError }</p>
            </PageBTW>
        )
    }



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
                        onClick={() => setIsShowModalDelete(true)}
                    >
                        <DeleteIcon /> Видалити
                    </ButtonBlock>


                    {adaptBlock?.isDone[user?._id] ?
                        <ButtonBlock
                            className="fuchsia-b"
                            onClick={() => setIsShowModalAdaptBlockIsDoneUpdate(true)}
                        >
                            <CancelIcon /> Позначити непройденим
                        </ButtonBlock>
                        :
                        <ButtonBlock
                            className="green-b"
                            onClick={() => setIsShowModalAdaptBlockIsDoneUpdate(true)}
                        >
                            <OkIcon /> Позначити пройденим
                        </ButtonBlock>}
                </ButtonGroup.Actions>

                <ButtonGroup.Navigation
                // className="justify-between "
                >

                    <ButtonBlock
                        className="green-b-n"
                        onClick={() => navigate(`/adapts/${adaptBlock?.adaptId}`)}
                    >
                        <BackIcon /> Адаптація
                    </ButtonBlock>


                    {/* <CardBlock className="flex gap-2 p-0"> */}

                    <ButtonBlock
                        disabled={!prev}
                        className="cyan-b-n"
                        onClick={() => navigate(`/adapts/blocks/${prev?._id}`)}
                    >
                        Попередній
                    </ButtonBlock>

                    <ButtonBlock
                        disabled={!next}
                        className="cyan-b-n"
                        onClick={() => navigate(`/adapts/blocks/${next?._id}`)}
                    >
                        Наступний
                    </ButtonBlock>

                    {/* </CardBlock> */}


                </ButtonGroup.Navigation>

            </ButtonGroup>


            {/* MODALS */}

            {isShowModalDelete &&
                <ModalDelete
                    ask="Ви впевнені, що хочете видалити цей блок адаптації? "
                    onDelete={handleAdaptBlockDelete}
                    onCancel={() => setIsShowModalDelete(false)}
                    isDeleting={isAdaptBlockDeleting}
                />
            }


            {isShowModalAdaptBlockIsDoneUpdate &&
                <ModalConfirm
                    ask="Змінити статус блоку адаптації?"
                    onConfirm={handleAdaptBlockIsDoneUpdate}
                    onCancel={() => setIsShowModalAdaptBlockIsDoneUpdate(false)}
                    isConfirming={isAdaptBlockIsDoneUpdating}
                />
            }

            {/* MODALS END */}

            <AdaptBlockIns
                instruction={instruction}
            />


        </PageBTW >

    )
}

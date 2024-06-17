import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalConfirm, ModalDelete, PageBTW, TextBlock } from '../../components'

import { useNavigate, useParams } from 'react-router-dom'
import InsBodyContainer from '../Instructions/components/InsBodyContainer';
import YoutubeCard from '../../components/UI/YoutubeCard/YoutubeCard';
import useFetchAdaptBlockById from './hooks/useFetchAdaptBlockById';
import { CancelIcon, DeleteIcon, OkIcon } from '../../components/UI/Icons';
import useAdaptBlocksStore from './stores/adaptBlocksStore';
import useAuthStore from '../Auth/authStore';







export default function AdaptBlockPage() {

    const { id } = useParams()
    const navigate = useNavigate();

    const { user } = useAuthStore()



    const { adaptBlock, instruction, isAdaptBlockLoading, error } = useFetchAdaptBlockById(id);


    const { deleteAdaptBlockById, updateAdaptBlockIsDone } = useAdaptBlocksStore();



    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isAdaptBlockDeleting, setIsAdaptBlockDeleting] = useState(false);


    const [isShowModalAdaptBlockIsDoneUpdate, setIsShowModalAdaptBlockIsDoneUpdate] = useState(false);
    const [isAdaptBlockIsDoneUpdating, setIsAdaptBlockIsDoneUpdating] = useState(false);




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
                            className="rose-b"
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



                <ButtonGroup.Navigation>

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


            <ContainerBlock
                className="space-y-4"
            >
                <TextBlock
                    className="font-bold text-2xl w-full bg-blue-500 rounded-xl p-4"
                >

                    {instruction?.title}
                </TextBlock>

                {instruction?.videoUrl &&

                    <YoutubeCard url={instruction?.videoUrl} />
                }



                {instruction?.body
                    ?
                    <InsBodyContainer

                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: instruction?.body
                            }} >

                        </div>
                    </InsBodyContainer>
                    :
                    <TextBlock className="text-xl italic text-slate-500"  >Текст інструкції відсутній</TextBlock>
                }
            </ContainerBlock>




        </PageBTW >

    )
}

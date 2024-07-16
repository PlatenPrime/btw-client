import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, Spinner, TextBlock } from '../../../../components'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'
import InsBage from '../../../Instructions/components/InsBage';
import { BiFolder } from 'react-icons/bi';
import useAdaptBlocksStore from '../../stores/adaptBlocksStore';
import InsFolderBage from '../../../Instructions/components/InsFolderBage';
import ChooseInsFromFolderModal from './ChooseInsFromFolderModal';

export default function AddNewBlockForm({

    insFolders,
    instructions,
    adapt,
    users

}) {


    const { createAdaptBlock } = useAdaptBlocksStore();

    const [newAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)
    const [isShowChooseInsFromFolderModal, setIsShowChooseInsFromFolderModal] = useState(false)



    const [isNewAdaptBlockEditing, setIsNewAdaptBlockEditing] = useState(false);
    const [isAdaptBlockCreating, setIsAdaptBlockCreating] = useState(false);

    console.log(insFolders);





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










    if (!isNewAdaptBlockEditing) {
        return <ButtonBlock
            className="w-full cyan-b bg-transparent  rounded-3xl border-4 border-dashed hover:border-cyan-500   p-4"
            onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
        >
            Додати блок
        </ButtonBlock>

    }



    return (
        <CardBlock
            className="w-full rounded-xl  border-4 border-dashed  border-cyan-500/50 p-4 space-y-4 "
        >


            <TextBlock
                className=" text-2xl font-bold "
            >
                Створенння нового блоку адаптації
            </TextBlock>


            <CardBlock
                className="grid grid-cols-1 lg:grid-cols-3 gap-2"
            >
                {insFolders?.map((insFolder) =>

                    <TextBlock
                        key={insFolder?._id}
                        className=""
                        onClick={() => setIsShowChooseInsFromFolderModal(true)}
                    >
                        {insFolder?.title}
                    </TextBlock>
                )}
            </CardBlock>


            <ChooseInsFromFolderModal
                isShowChooseInsFromFolderModal={isShowChooseInsFromFolderModal}
                setIsShowChooseInsFromFolderModal={setIsShowChooseInsFromFolderModal}
            />



            {newAdaptBlockInsId && <InsBage
                ins={instructions?.find((ins) => ins?._id === newAdaptBlockInsId)}
                insFolder={insFolders?.find((insfolder) => insfolder?._id === instructions?.find((ins) => ins?._id === newAdaptBlockInsId)?.folderId)}
                users={users}

            />}




            <CardBlock
                className="grid grid-cols-2 gap-2"
            >
                <ButtonBlock
                    className="rose-b flex justify-center items-center"
                    onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
                >

                    <TextBlock className="text-2xl"><CancelIcon /></TextBlock>
                    <TextBlock className=""> Скасувати</TextBlock>

                </ButtonBlock>

                <ButtonBlock
                    onClick={() => {
                        handleCreateAdaptBlock({
                            insId: newAdaptBlockInsId,
                            adaptId: adapt?._id
                        })
                        setNewAdaptBlockInsId(null)
                    }}
                    className="green-b flex justify-center items-center"
                    disabled={!newAdaptBlockInsId}

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
    )
}

import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, Spinner, TextBlock } from '../../../components'
import { CancelIcon, OkIcon } from '../../../components/UI/Icons'
import InsBage from '../../Instructions/components/InsBage';

export default function AddNewBlockForm({

    handleCreateAdaptBlock,
    insFolders,
    isAdaptBlockCreating,
    instructions,
    setIsNewAdaptBlockEditing,
    isNewAdaptBlockEditing,
    adapt,
    users

}) {

    const [newAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)




    if (!isNewAdaptBlockEditing) {
        return <ButtonBlock
            className="w-full green-b bg-transparent  rounded-3xl border-4 border-dashed hover:border-green-500  p-4"
            onClick={() => setIsNewAdaptBlockEditing(!isNewAdaptBlockEditing)}
        >
            Додати блок
        </ButtonBlock>

    }



    return (
        <CardBlock
            className="w-full rounded-xl  border-4 border-dashed  border-green-500/20 p-4 space-y-4 "
        >


            <TextBlock
                className=" text-2xl font-bold "
            >
                Створенння нового блоку адаптації
            </TextBlock>




            <CardBlock
                className="flex items-center space-x-4"
            >

                <label>
                    <TextBlock className=" text-xl">
                        Інструкція:
                    </TextBlock>
                </label>


                <select
                    className="InputBlock w-full text-xl "
                    name="insId"
                    onChange={(e) => setNewAdaptBlockInsId(e.target.value)}
                >

                    <option
                        className="bg-blue-500 text-white "
                        value=""
                        disabled
                        selected
                    >
                        Вибери інструкцію
                    </option>

                    {insFolders?.map((insfolder) => (
                        <optgroup
                            key={insfolder?._id}
                            label={insfolder?.title}
                            className=" bg-slate-900 text-blue-300  "
                        >

                            {instructions?.filter((ins) => insfolder?._id === ins?.folderId).map((ins) => (
                                <option
                                    key={ins?._id}
                                    value={ins?._id}
                                    className="text-white "

                                >

                                    {ins?.title}
                                </option>
                            ))}

                        </optgroup>
                    ))}


                </select>
            </CardBlock>




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

import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, Spinner, TextBlock } from '../../../components'
import { CancelIcon, OkIcon } from '../../../components/UI/Icons'

export default function AddNewBlockForm({
  
    handleCreateAdaptBlock,
    insFolders,
    isAdaptBlockCreating,
    instructions,
    setIsNewAdaptBlockEditing,
    isNewAdaptBlockEditing,
    adapt

}) {

    const [newAdaptBlockTitle, setNewAdaptBlockTitle] = useState('')
const [newAdaptBlockInsId, setNewAdaptBlockInsId] = useState(null)








    return (
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
                        selected
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
    )
}

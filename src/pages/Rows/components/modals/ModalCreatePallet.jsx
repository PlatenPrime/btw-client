import React from 'react'
import { ButtonBlock, CardBlock, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'
import { useState } from 'react'

export default function ModalCreatePallet({
    showModalCreatePallet,
    setShowModalCreatePallet,
    handleCreatePallet,
    isPalletCreating
}) {



    const [newPalletTitle, setNewPalletTitle] = useState("")
    const [newPalletCom, setNewPalletCom] = useState("")



    if (!showModalCreatePallet) return null


    return (
        <ModalWrapper
            title="Створення нової палети"
            onCancel={() => setShowModalCreatePallet(false)}
        >

            <CardBlock
                className="space-y-3"
            >



                <CardBlock
                    className="grid grid-cols-2"
                >

                    <TextBlock>
                        Назва палети
                    </TextBlock>
                    <InputBlock
                        value={newPalletTitle}
                        name="newPalletTitle"
                        type="text"
                        placeholder="XX-XX-X-X"
                        onChange={(e) => setNewPalletTitle(e.target.value)}
                    />
                </CardBlock>


                <CardBlock
                    className="grid grid-cols-2"
                >

                    <TextBlock>
                        Коментарій
                    </TextBlock>
                    <InputBlock
                        value={newPalletCom}
                        name="newPalletCom"
                        type="text"
                        placeholder="....."
                        onChange={(e) => setNewPalletCom(e.target.value)}
                    />
                </CardBlock>


            </CardBlock>

            <CardBlock
                className="grid grid-cols-2 gap-4"
            >

                <ButtonBlock
                    className="red-b flex justify-center items-center"
                    onClick={() => setShowModalCreatePallet(false)}
                >
                    <TextBlock className="text-2xl"><CancelIcon /></TextBlock>
                    <TextBlock className=""> Скасувати</TextBlock>

                </ButtonBlock>


                <ButtonBlock
                    className="green-b flex justify-center items-center"
                    onClick={() => handleCreatePallet(newPalletTitle, newPalletCom)}
                >
                    {isPalletCreating
                        ?
                        <Spinner color="rgb(134 239 172)" />
                        :
                        <>
                            <TextBlock className="text-2xl"><OkIcon /></TextBlock>
                            <TextBlock className=""> Створити</TextBlock>
                        </>

                    }

                </ButtonBlock>


            </CardBlock>


        </ModalWrapper>
    )
}

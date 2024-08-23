import React, { useState } from 'react'
import useAskStore from '../../stores/asksStore'
import { sendMessageToTelegram } from "../../../../utils/sendMessagesTelegram"
import useAuthStore from '../../../Auth/authStore'
import useFetchUsers from '../../../Auth/hooks/useFetchUsers'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import useFetchArts from '../../../../hooks/useFetchArts'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'
import useFetchAllPoses from '../../../Poses/hooks/useFetchAllPoses'

export default function ModalCreateAsk({
    artikul,
    showModalCreateAsk,
    setShowModalCreateAsk
}) {
    const { artsDB } = useFetchArts()
    const { isLoadingUsers } = useFetchUsers()
    const { user, users } = useAuthStore()
    const { createAsk } = useAskStore()

    const { allPoses, isAllPosesLoading } = useFetchAllPoses()


    


    const [newAskArtikul, setNewAskArtikul] = useState(artikul)
    const [newAskQuant, setNewAskQuant] = useState('')
    const [newAskCom, setNewAskCom] = useState('')
    const [isAskCreating, setIsAskCreating] = useState(false)



    const isExistOnAllPoses =  allPoses?.some(pos => pos.artikul === newAskArtikul)
    const isShowEmptyWarning = newAskArtikul?.length === 9  && !isExistOnAllPoses
 




    async function handleCreateAsk(newAskData) {
        try {
            setIsAskCreating(true)


            const createdAsk = await createAsk(newAskData)

            console.log("Created Ask: ", createdAsk);

            const user = users?.find(user => user._id === createdAsk?.asker)
            const artikul = createdAsk?.artikul
            const quant = createdAsk?.quant
            const com = createdAsk?.com


            if (user?.role !== "PRIME")
                await sendMessageToTelegram(`
			${user?.fullname}: необхідно зняти ${artikul}.
			${quant ? `Кількість: ${quant} шт` : ""}
			${com ? `Коментарій: ${com}` : ""}
			`)



        } catch (error) {
            console.log(error)
        } finally {
            setIsAskCreating(false)
            setShowModalCreateAsk(false)
            setNewAskArtikul("")
            setNewAskQuant("")
            setNewAskCom("")

        }

    }









    return (
        <>
            {showModalCreateAsk && <ModalWrapper
                onCancel={() => setShowModalCreateAsk(false)}
                title="Створення запиту на зняття "
            >


                <CardBlock
                    className="flex flex-col space-y-8 min-w-fit max-w-lg text-xl "
                >

                    <CardBlock className="grid grid-cols-1 gap-1">
                        <CardBlock
                            className="grid justify-self-center w-full place-content-center bg-white"
                        >
                            <ImageArt
                                size={150}
                                artikul={newAskArtikul?.length === 9 ? newAskArtikul : "1102-3092"}
                            />
                        </CardBlock>
                        <TextBlock className="text-xl grid justify-self-center italic">
                            {artsDB?.find((art) => art.artikul === newAskArtikul)?.nameukr || newAskArtikul}
                        </TextBlock>
                    </CardBlock>


                    <CardBlock className="space-y-2">


                        <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                            <label className=" justify-self-center self-center md:justify-self-start" htmlFor="artikul">Артикул:</label>
                            <InputBlock
                                type="text"
                                id="artikul"
                                name="artikul"
                                autoComplete="off"
                                value={newAskArtikul}
                                onChange={(e) => setNewAskArtikul(e.target.value)}
                            />
                        </CardBlock>





                        <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                            <label className=" justify-self-center self-center md:justify-self-start" htmlFor="quant">Кількість:</label>
                            <InputBlock
                                type="number"
                                id="quant"
                                name="quant"
                                autoComplete="off"
                                value={newAskQuant}
                                onChange={(e) => setNewAskQuant(e.target.value)}
                            />
                        </CardBlock>

                        <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                            <label className=" justify-self-center self-center md:justify-self-start" htmlFor="com">Комент:</label>
                            <InputBlock
                                type="text"
                                id="com"
                                name="com"
                                autoComplete="off"
                                value={newAskCom}
                                onChange={(e) => setNewAskCom(e.target.value)}
                            />
                        </CardBlock>

                    </CardBlock>

                    {isShowEmptyWarning && <CardBlock
                        className="border-2 border-red-500 rounded-xl"
                    >
                        <TextBlock className="text-red-500 text-center">Увага! Цього артикулу може не бути на запасах. Уточни у комірника.</TextBlock>
                    </CardBlock>
                    }


                    <CardBlock className="grid grid-cols-2 space-x-2">


                        <ButtonBlock
                            className="red-b flex justify-center items-center"
                            onClick={() => setShowModalCreateAsk(false)}
                        >
                            <TextBlock className="text-xl"><CancelIcon /></TextBlock>
                            <TextBlock className="text-lg"> Скасувати</TextBlock>

                        </ButtonBlock>



                        <ButtonBlock
                            disabled={!newAskArtikul}
                            type="submit"
                            className="green-b flex justify-center items-center"
                            onClick={() => handleCreateAsk({
                                artikul: newAskArtikul,
                                quant: newAskQuant,
                                status: "new",
                                com: newAskCom,
                                asker: user?._id
                            })}
                        >


                            {isAskCreating ?

                                <Spinner color="green" />
                                :
                                <>
                                    <TextBlock className="text-xl"><OkIcon /></TextBlock>
                                    <TextBlock className="text-lg"> 	Створити</TextBlock>
                                </>

                            }

                        </ButtonBlock>
                    </CardBlock>


                </CardBlock>
            </ModalWrapper>
            }
        </>
    )
}

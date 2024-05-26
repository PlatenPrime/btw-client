import React, { useState } from 'react'
import useAskStore from '../../../Asks/stores/asksStore'
import { sendMessageToTelegram } from "../../../../utils/sendMessagesTelegram"
import useAuthStore from '../../../Auth/authStore'
import useFetchUsers from '../../../Auth/hooks/useFetchUsers'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import useFetchArts from '../../../../hooks/useFetchArts'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

export default function ModalCreateAsk({
    artikul,
    showModalCreateAsk,
    setShowModalCreateAsk
}) {
    const { artsDB } = useFetchArts()
    const { isLoadingUsers } = useFetchUsers()
    const { user, users } = useAuthStore()
    const { createAsk } = useAskStore()



    const [newAskQuant, setNewAskQuant] = useState('')
    const [newAskCom, setNewAskCom] = useState('')
    const [isAskCreating, setIsAskCreating] = useState(false)



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
            setNewAskQuant("")
            setNewAskCom("")

        }

    }









    return (
        <>
            {showModalCreateAsk && <ModalWrapper
                onCancel={() => setShowModalCreateAsk(false)}
                title={`Створення запиту на зняття артикулу ${artikul}`}
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
                                artikul={artikul?.length === 9 ? artikul : "1102-3092"}
                            />
                        </CardBlock>
                        <TextBlock className="text-xl grid justify-self-center italic">
                            {artsDB?.find((art) => art.artikul === artikul)?.nameukr || artikul}
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
                                value={artikul}

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



                    <CardBlock className="grid grid-cols-2 space-x-2">


                        <ButtonBlock
                            className="red-b flex justify-center items-center"
                            onClick={() => setShowModalCreateAsk(false)}
                        >
                            <TextBlock className="text-2xl"><CancelIcon /></TextBlock>
                            <TextBlock className="text-lg"> Скасувати</TextBlock>

                        </ButtonBlock>



                        <ButtonBlock
                            disabled={!artikul}
                            type="submit"
                            className="green-b flex justify-center items-center"
                            onClick={() => handleCreateAsk({
                                artikul: artikul,
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
                                    <TextBlock className="text-2xl"><OkIcon /></TextBlock>
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

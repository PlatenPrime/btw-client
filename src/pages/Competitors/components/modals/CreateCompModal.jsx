import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'








export default function CreateCompModal({
    isShowModalCreateComp,
    setIsShowModalCreateComp,
    artsDB,
    isCompCreating,
    comps

}) {



    const [newCompArtikul, setNewCompArtikul] = useState("")


    const isExist = comps?.find(comp => comp.artikul === newCompArtikul)

    if (!isShowModalCreateComp) return null
    return (

        <ModalWrapper
            title="Додавання нового артикулу для аналізу"
            onCancel={() => setIsShowModalCreateComp(false)}

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
                            artikul={newCompArtikul?.length === 9 ? newCompArtikul : "1102-3092"}
                        />
                    </CardBlock>
                    <TextBlock className="text-xl grid justify-self-center italic">
                        {artsDB?.find((art) => art.artikul === newCompArtikul)?.nameukr || newCompArtikul}
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
                            value={newCompArtikul}
                            onChange={(e) => setNewCompArtikul(e.target.value)}
                        />
                    </CardBlock>



                </CardBlock>



                {isExist && <TextBlock
                    className="text-red-500"
                >
                    Цей артикул вже аналізується
                </TextBlock>}

                <TextBlock></TextBlock>



                <CardBlock className="grid grid-cols-2 space-x-2">


                    <ButtonBlock
                        className="red-b flex justify-center items-center"
                        onClick={() => setIsShowModalCreateComp(false)}
                    >
                        <TextBlock className="text-xl"><CancelIcon /></TextBlock>
                        <TextBlock className="text-lg"> Скасувати</TextBlock>

                    </ButtonBlock>



                    <ButtonBlock
                        disabled={!newCompArtikul || isExist}
                        type="submit"
                        className="green-b flex justify-center items-center"
                    // onClick={() => handleCreateAsk({
                    //     artikul: newAskArtikul,
                    //     quant: newAskQuant,
                    //     status: "new",
                    //     com: newAskCom,
                    //     asker: user?._id
                    // })}
                    >


                        {isCompCreating ?

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
    )
}

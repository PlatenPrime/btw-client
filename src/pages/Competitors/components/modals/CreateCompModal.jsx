import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

import { categories, subcategories, sizesList, prods } from '../../../../constants/compsData'






export default function CreateCompModal({
    isShowModalCreateComp,
    setIsShowModalCreateComp,
    artsDB,
    isCompCreating,
    comps

}) {



    const [newCompArtikul, setNewCompArtikul] = useState("")
    const [newCompProd, setNewCompProd] = useState("")
    const [newCompSize, setNewCompSize] = useState("")

    const [newCompSharteLink, setNewCompSharteLink] = useState("")
    const [newCompYumiLink, setNewCompYumiLink] = useState("")


















    const isExist = comps?.find(comp => comp.artikul === newCompArtikul)
    const isExistInDB = artsDB?.find(art => art.artikul === newCompArtikul)

    if (!isShowModalCreateComp) return null
    return (

        <ModalWrapper
            title="Додавання нового артикулу для аналізу"
            onCancel={() => setIsShowModalCreateComp(false)}

        >
            <CardBlock
                className="flex flex-col space-y-4 min-w-fit max-w-lg text-lg "
            >





                <CardBlock
                    className="grid grid-cols-1 lg:grid-cols-3 gap-1 
                bg-gradient-to-b from-sky-500 to-sky-700/50
                rounded-xl
                ">



                    <CardBlock
                        className="grid justify-self-center w-full place-content-center bg-white"
                    >
                        <ImageArt
                            size={150}
                            artikul={newCompArtikul?.length === 9 ? newCompArtikul : "1102-3092"}
                        />
                    </CardBlock>

                    <CardBlock
                        className="lg:col-span-2 flex flex-col"
                    >
                        <TextBlock
                            className="text-xl font-bold p-2 " >
                            {artsDB?.find((art) => art.artikul === newCompArtikul)?.nameukr || "Назва артикулу"}
                        </TextBlock>

                        <TextBlock
                            className="text-lg font-bold"
                        >
                            {categories[newCompArtikul?.slice(0, 2)] || "Категорія"}
                        </TextBlock>



                        <TextBlock
                            className="text-base "
                        >
                            {subcategories[newCompArtikul?.slice(0, 4)] || "Підкатегорія"}
                        </TextBlock>

                    </CardBlock>


                </CardBlock>











                <CardBlock className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">


                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label className=" justify-self-center self-center md:justify-self-start" htmlFor="artikul">Артикул:</label>
                        <InputBlock
                            type="text"
                            id="artikul"
                            name="artikul"
                            autoComplete="off"
                            value={newCompArtikul}
                            onChange={(e) => setNewCompArtikul(e.target.value)}
                            placeholder="Наприклад 1102-3092"
                        />
                    </CardBlock>


                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label className=" justify-self-center self-center md:justify-self-start" htmlFor="prod">Виробник:</label>
                        <select
                            className="InputBlock "
                            name="prod"
                            id=""
                            onChange={(e) => setNewCompProd(e.target.value)}
                        >
                            <option value="default" disabled selected className="bg-slate-900" >
                                Виберіть виробника
                            </option>
                            {prods?.map((prod) => (
                                <option
                                    className="InputBlock bg-slate-900"
                                    key={prod}
                                    value={prod} >
                                    {prod}
                                </option>
                            ))}
                        </select>
                    </CardBlock>


                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label className=" justify-self-center self-center md:justify-self-start" htmlFor="size">Розмір:</label>
                        <select
                            className="InputBlock "
                            name="size"
                            id=""
                            onChange={(e) => setNewCompSize(e.target.value)}
                        >
                            <option value="default" disabled selected className="bg-slate-900" >
                                Виберіть розмір
                            </option>
                            {sizesList?.map((size) => (
                                <option
                                    className="InputBlock bg-slate-900"
                                    key={size}
                                    value={size} >
                                    {size}
                                </option>
                            ))}
                        </select>
                    </CardBlock>

                </CardBlock>






                <CardBlock className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">

                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label className=" justify-self-center self-center md:justify-self-start" htmlFor="sharte">Шарте:</label>
                        <InputBlock
                            type="text"
                            id="sharte"
                            name="sharte"
                            autoComplete="off"
                            value={newCompSharteLink}
                            onChange={(e) => setNewCompSharteLink(e.target.value)}
                            placeholder="https://sharte.net/"
                        />
                    </CardBlock>


                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label className=" justify-self-center self-center md:justify-self-start" htmlFor="yumi">Юмі:</label>
                        <InputBlock
                            type="text"
                            id="yumi"
                            name="yumi"
                            autoComplete="off"
                            value={newCompYumiLink}
                            onChange={(e) => setNewCompYumiLink(e.target.value)}
                            placeholder="https://yumi-market.com.ua/ua/"
                        />
                    </CardBlock>

                </CardBlock>



                {isExist && <TextBlock
                    className="text-red-500"
                >
                    Цей артикул вже аналізується
                </TextBlock>}

                <TextBlock></TextBlock>



                <CardBlock className="grid grid-cols-2 space-x-2 text-lg">


                    <ButtonBlock
                        className="red-b flex justify-center items-center"
                        onClick={() => setIsShowModalCreateComp(false)}
                    >
                        <TextBlock className=""><CancelIcon /></TextBlock>
                        <TextBlock className=""> Скасувати</TextBlock>

                    </ButtonBlock>



                    <ButtonBlock
                        disabled={!newCompArtikul || isExist || !isExistInDB || isCompCreating}
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
                                <TextBlock className=""><OkIcon /></TextBlock>
                                <TextBlock className=""> 	Створити</TextBlock>
                            </>

                        }

                    </ButtonBlock>
                </CardBlock>


            </CardBlock>





        </ModalWrapper>
    )
}

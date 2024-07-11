import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

import { categories, subcategories, sizesList, prods } from '../../../../constants/compsData'
import useCompStore from '../../stores/compStore'


export default function CreateCompModal({
    isShowModalCreateComp,
    setIsShowModalCreateComp,
    artsDB,
    comps

}) {


    const { createComp } = useCompStore()

    const initialStateForm = {
        artikul: "",
        prod: "",
        size: "",
        sharteLink: "",
        yumiLink: "",
        airLink: "",
        bestLink: "",
    }


    const [state, setState] = useState(initialStateForm)
    const [isCompCreating, setIsCompCreating] = useState(false)




    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleCreateComp = async (compData) => {
        try {

            setIsCompCreating(true)

            await createComp(compData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsCompCreating(false)
            setIsShowModalCreateComp(false)
        }
    }


    const isExist = comps?.find(comp => comp.artikul === state.artikul)
    const isExistInDB = artsDB?.find(art => art.artikul === state.artikul)

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
                            artikul={state.artikul?.length === 9 ? state.artikul : "1102-3092"}
                        />
                    </CardBlock>

                    <CardBlock
                        className="lg:col-span-2 flex flex-col justify-between"
                    >
                        <TextBlock
                            className="text-xl font-bold p-2 " >
                            {artsDB?.find((art) => art.artikul === state.artikul)?.nameukr}
                        </TextBlock>



                        <CardBlock>

                            <TextBlock
                                className="text-lg font-bold"
                            >
                                {categories[state.artikul?.slice(0, 2)]}
                            </TextBlock>

                            <TextBlock
                                className="text-base "
                            >
                                {subcategories[state.artikul?.slice(0, 4)]}
                            </TextBlock>

                        </CardBlock>

                    </CardBlock>

                </CardBlock>



                <CardBlock className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="artikul">
                            Артикул:
                        </label>
                        <InputBlock
                            type="text"
                            id="artikul"
                            name="artikul"
                            autoComplete="off"
                            value={state.artikul}
                            onChange={handleChange}
                            placeholder="Наприклад 1102-3092"
                        />
                    </CardBlock>


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="prod">
                            Виробник:
                        </label>
                        <select
                            className="InputBlock "
                            name="prod"
                            id=""
                            onChange={handleChange}
                        >
                            <option
                                value="default"
                                disabled
                                selected
                                className="bg-slate-900" >
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


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start"
                            htmlFor="size">
                            Розмір:
                        </label>
                        <select
                            className="InputBlock "
                            name="size"
                            id=""
                            onChange={handleChange}
                        >
                            <option value="default"
                                disabled
                                selected
                                className="bg-slate-900" >
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








                <CardBlock
                    className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">





                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="yumiLink">
                            Yumi:
                        </label>
                        <InputBlock
                            type="text"
                            id="yumiLink"
                            name="yumiLink"
                            autoComplete="off"
                            value={state.yumiLink}
                            onChange={handleChange}
                            placeholder="https://yumi-market.com.ua/ua/"
                        />
                    </CardBlock>




                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start"
                            htmlFor="sharteLink">
                            Sharte:
                        </label>
                        <InputBlock
                            type="text"
                            id="sharteLink"
                            name="sharteLink"
                            autoComplete="off"
                            value={state.sharteLink}
                            onChange={handleChange}
                            placeholder="https://sharte.net/"
                        />
                    </CardBlock>





                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="airLink">
                            Air:
                        </label>
                        <InputBlock
                            type="text"
                            id="airLink"
                            name="airLink"
                            autoComplete="off"
                            value={state.airLink}
                            onChange={handleChange}
                            placeholder="https://airballoons.com.ua/ua/"
                        />
                    </CardBlock>



                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="bestLink">
                            Best:
                        </label>
                        <InputBlock
                            type="text"
                            id="bestLink"
                            name="bestLink"
                            autoComplete="off"
                            value={state.bestLink}
                            onChange={handleChange}
                            placeholder="https://best-balloons.com.ua/"
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
                        disabled={!state.artikul || isExist || !isExistInDB || isCompCreating}
                        type="submit"
                        className="green-b flex justify-center items-center"

                        onClick={() =>
                            handleCreateComp({
                                artikul: state.artikul,
                                prod: state.prod,
                                size: state.size,
                                category: categories[state.artikul?.slice(0, 2)],
                                subcategory: subcategories[state.artikul?.slice(0, 4)],
                                nameukr: artsDB?.find((art) => art.artikul === state.artikul)?.nameukr,
                                competitorsLinks: {
                                    sharteLink: state.sharteLink,
                                    yumiLink: state.yumiLink,
                                    airLink: state.airLink,
                                    bestLink: state.bestLink
                                }
                            })


                        }
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
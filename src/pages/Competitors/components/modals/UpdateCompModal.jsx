import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import useCompStore from '../../stores/compStore'
import { sizesList, prods } from '../../../../constants/compsData'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

export default function UpdateCompModal({
    comp,
    isShowModalCompUpdate,
    setIsShowModalCompUpdate,

}) {


    const { updateCompById } = useCompStore()

    const initialStateForm = {
        prod: comp?.prod || "",
        size: comp?.size || "",
        sharteLink: comp?.competitorsLinks?.sharteLink || "",
        yumiLink: comp?.competitorsLinks?.yumiLink || "",
        airLink: comp?.competitorsLinks?.airLink || "",
        bestLink: comp?.competitorsLinks?.bestLink || "",

        aeroLink: comp?.competitorsLinks?.aeroLink || "",
        balunLink: comp?.competitorsLinks?.balunLink || "",
        svyatoLink: comp?.competitorsLinks?.svyatoLink || "",
        ideaLink: comp?.competitorsLinks?.ideaLink || "",
        chudoLink: comp?.competitorsLinks?.chudoLink || "",
    }

    const [state, setState] = useState(initialStateForm)

    const [isCompUpdating, setIsCompUpdating] = useState(false)


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdateComp = async (compData) => {
        try {

            setIsCompUpdating(true)

            await updateCompById(comp?._id, compData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsCompUpdating(false)
            setIsShowModalCompUpdate(false)
        }
    }




    if (!comp || !isShowModalCompUpdate) return

    return (
        <ModalWrapper
            title={`Редагування артикулу ${comp?.artikul}`}
            onCancel={() => setIsShowModalCompUpdate(false)}
        >
            <CardBlock
                className="flex flex-col space-y-4 min-w-fit max-w-lg text-lg  "
            >

                <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                    <label className="justify-self-center self-center md:justify-self-start" htmlFor="prod">
                        Виробник:
                    </label>
                    <select
                        className="InputBlock"
                        name="prod"
                        id=""
                        value={state.prod || "default"}
                        onChange={handleChange}
                    >
                        <option value="default" disabled className="bg-slate-900">
                            Виберіть виробника
                        </option>
                        {prods?.map((prod) => (
                            <option className="InputBlock bg-slate-900" key={prod} value={prod}>
                                {prod}
                            </option>
                        ))}
                    </select>
                </CardBlock>

                <CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                    <label className="justify-self-center self-center md:justify-self-start" htmlFor="size">
                        Розмір:
                    </label>
                    <select
                        className="InputBlock"
                        name="size"
                        id=""
                        value={state.size || "default"}
                        onChange={handleChange}
                    >
                        <option value="default" disabled className="bg-slate-900">
                            Виберіть розмір
                        </option>
                        {sizesList?.map((size) => (
                            <option className="InputBlock bg-slate-900" key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </CardBlock>


                <CardBlock
                    className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl text-base">


                    <TextBlock className="text-base text-yellow-500 italic">
                        Посилання на українські сторінки сайтів
                    </TextBlock>

                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
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





                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="aeroLink">
                            Aero:
                        </label>
                        <InputBlock
                            type="text"
                            id="aeroLink"
                            name="aeroLink"
                            autoComplete="off"
                            value={state.aeroLink}
                            onChange={handleChange}
                            placeholder="https://aero-boom.com.ua/ua/"
                        />
                    </CardBlock>



                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="balunLink">
                            Balun:
                        </label>
                        <InputBlock
                            type="text"
                            id="balunLink"
                            name="balunLink"
                            autoComplete="off"
                            value={state.balunLink}
                            onChange={handleChange}
                            placeholder="https://balun.com.ua/ua/"
                        />
                    </CardBlock>


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="svyatoLink">
                            Svyato:
                        </label>
                        <InputBlock
                            type="text"
                            id="svyatoLink"
                            name="svyatoLink"
                            autoComplete="off"
                            value={state.svyatoLink}
                            onChange={handleChange}
                            placeholder="https://svyatoopt.com.ua/ua/"
                        />
                    </CardBlock>


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="ideaLink">
                            Idea:
                        </label>
                        <InputBlock
                            type="text"
                            id="ideaLink"
                            name="ideaLink"
                            autoComplete="off"
                            value={state.ideaLink}
                            onChange={handleChange}
                            placeholder="https://ideaopt.com.ua/ua/"
                        />
                    </CardBlock>


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="chudoLink">
                            Чудо:
                        </label>
                        <InputBlock
                            type="text"
                            id="chudoLink"
                            name="chudoLink"
                            autoComplete="off"
                            value={state.chudoLink}
                            onChange={handleChange}
                            placeholder="https://chudomesto.com/uk/"
                        />
                    </CardBlock>




                </CardBlock>

                <CardBlock className="grid grid-cols-2 space-x-2 text-lg">


                    <ButtonBlock
                        className="red-b flex justify-center items-center"
                        onClick={() => setIsShowModalCompUpdate(false)}
                    >
                        <TextBlock className=""><CancelIcon /></TextBlock>
                        <TextBlock className=""> Скасувати</TextBlock>

                    </ButtonBlock>



                    <ButtonBlock
                        disabled={isCompUpdating}
                        type="submit"
                        className="green-b flex justify-center items-center"

                        onClick={() =>
                            handleUpdateComp({
                                prod: state.prod,
                                size: state.size,
                                competitorsLinks: {
                                    sharteLink: state.sharteLink,
                                    yumiLink: state.yumiLink,
                                    airLink: state.airLink,
                                    bestLink: state.bestLink,

                                    aeroLink: state.aeroLink,
                                    balunLink: state.balunLink,
                                    svyatoLink: state.svyatoLink,
                                    ideaLink: state.ideaLink,
                                    chudoLink: state.chudoLink,
                                }
                            })
                        }
                    >


                        {isCompUpdating ?

                            <Spinner color="green" />
                            :
                            <>
                                <TextBlock className=""><OkIcon /></TextBlock>
                                <TextBlock className=""> Зберегти</TextBlock>
                            </>

                        }

                    </ButtonBlock>
                </CardBlock>


            </CardBlock>
        </ModalWrapper>
    )
}

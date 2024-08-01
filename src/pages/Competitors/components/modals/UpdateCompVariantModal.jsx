import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import useCompStore from '../../stores/compStore'
import { sizesList, prods } from '../../../../constants/compsData'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

export default function UpdateCompVariantModal({
    compVariant,
    isShowModalCompVariantUpdate,
    setIsShowModalCompVariantUpdate,
}) {


    const { updateCompVariantById } = useCompStore()

    const initialStateForm = {
        prod: compVariant?.prod || "",
        size: compVariant?.size || "",
        sharteLink: compVariant?.competitorsLinks?.sharteLink || "",
        yumiLink: compVariant?.competitorsLinks?.yumiLink || "",
        airLink: compVariant?.competitorsLinks?.airLink || "",
        bestLink: compVariant?.competitorsLinks?.bestLink || "",
    }

    const [state, setState] = useState(initialStateForm)

    const [isCompVariantUpdating, setIsCompVariantUpdating] = useState(false)


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdateCompVariant = async (compVariantData) => {
        try {

            setIsCompVariantUpdating(true)

            await updateCompVariantById(compVariant?._id, compVariantData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsCompVariantUpdating(false)
            setIsShowModalCompVariantUpdate(false)
        }
    }



    if (!compVariant || !isShowModalCompVariantUpdate) return

    return (
        <ModalWrapper
        title={`Редагування варіанту ${compVariant?.artikul}`}
        onCancel={() => setIsShowModalCompVariantUpdate(false)}
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

            <CardBlock className="grid grid-cols-2 space-x-2 text-lg">


                <ButtonBlock
                    className="red-b flex justify-center items-center"
                    onClick={() => setIsShowModalCompVariantUpdate(false)}
                >
                    <TextBlock className=""><CancelIcon /></TextBlock>
                    <TextBlock className=""> Скасувати</TextBlock>

                </ButtonBlock>



                <ButtonBlock
                    disabled={isCompVariantUpdating}
                    type="submit"
                    className="green-b flex justify-center items-center"

                    onClick={() =>
                        handleUpdateCompVariant({
                            prod: state.prod,
                            size: state.size,
                            competitorsLinks: {
                                sharteLink: state.sharteLink,
                                yumiLink: state.yumiLink,
                                airLink: state.airLink,
                                bestLink: state.bestLink
                            }
                        })
                    }
                >


                    {isCompVariantUpdating ?

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

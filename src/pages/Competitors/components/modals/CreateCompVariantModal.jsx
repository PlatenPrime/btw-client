import React, { useState } from 'react'
import useCompStore from '../../stores/compStore'
import { ButtonBlock, CardBlock, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import { sizesList, prods } from '../../../../constants/compsData'
import { uploadImage } from '../../../../utils/uploadImage'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'

export default function CreateCompVariantModal({
    isShowModalCreateCompVariant,
    setIsShowModalCreateCompVariant,
    compVariants
}) {



    const { createCompVariant } = useCompStore()


    const initialStateForm = {
        artikul: "",
        title: "",
        imageUrl: "",
        prod: "",
        size: "",
        sharteLink: "",
        yumiLink: "",
        airLink: "",
        bestLink: "",

        aeroLink: "",
        balunLink: "",
        svyatoLink: "",
        ideaLink: "",
        chudoLink: "",


        isFileInput: false,

    }


    const [state, setState] = useState(initialStateForm)




    const [isImageUploading, setIsImageUploading] = useState(false)
    const [isCompVariantCreating, setIsCompVariantCreating] = useState(false)




    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }


    const handleUrlInputChange = (e) => {
        setState({
            ...state,
            imageUrl: e.target.value,
            isFileInput: false, // Переключаемся на ввод ссылки
        });
    };




    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                setIsImageUploading(true);
                const imageUrl = await uploadImage(file);
                console.log(imageUrl);
                setState({
                    ...state,
                    imageUrl: imageUrl,
                    isFileInput: true, // Переключаемся на загрузку файла
                });
            } catch (error) {
                console.log(error);
            } finally {
                setIsImageUploading(false);
            }
        }
    };




    const handleCreateCompVariant = async (compVariantData) => {
        try {

            setIsCompVariantCreating(true)

            await createCompVariant(compVariantData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsCompVariantCreating(false)
            setIsShowModalCreateCompVariant(false)
            setState(
                {
                    ...state,

                    imageUrl: "",

                    sharteLink: "",
                    yumiLink: "",
                    airLink: "",
                    bestLink: "",

                    aeroLink: "",
                    balunLink: "",
                    svyatoLink: "",
                    ideaLink: "",
                    chudoLink: "",

                }
            )
        }
    }


    const isExist = compVariants?.find(compVariant => compVariant.artikul === state.artikul)


    if (!isShowModalCreateCompVariant) return null

    return (

        <ModalWrapper

            title="Створення варіанту"
            onCancel={() => setIsShowModalCreateCompVariant(false)}
        >
            <CardBlock
                className="flex flex-col gap-4 min-w-fit max-w-lg text-base   "
            >

                <CardBlock
                    className="grid  gap-2 bg-slate-500/10 p-2 rounded-xl  "
                >

                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="justify-self-center self-center md:justify-self-start" htmlFor="imageFile">
                            Завантажити файл:
                        </label>
                        <InputBlock
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            autoComplete="off"
                            onChange={handleFileInputChange}
                            disabled={state.isFileInput === false && state.imageUrl !== ''} // Отключаем, если выбрана ссылка
                        />
                    </CardBlock>

                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="justify-self-center self-center md:justify-self-start" htmlFor="imageUrl">
                            Посилання:
                        </label>
                        <InputBlock
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            autoComplete="off"
                            value={state.isFileInput ? '' : state.imageUrl} // Очищаем текст, если выбран файл
                            onChange={handleUrlInputChange}
                            placeholder="Посилання на зображення"
                            disabled={state.isFileInput} // Отключаем, если выбран файл
                        />
                    </CardBlock>



                    <CardBlock
                        className="grid grid-cols-2 gap-2 bg-slate-800 justify-between rounded-xl "

                    >

                        <CardBlock className="rounded-xl flex justify-start 
                    " >

                            {isImageUploading ?
                                <Spinner />
                                :
                                state.imageUrl
                                    ?
                                    <img
                                        alt='Фото варіанта'
                                        src={state.imageUrl}
                                        width={150}
                                        className="rounded-xl "
                                    >
                                    </img>
                                    :

                                    <img
                                        className="rounded-xl "
                                        alt='Фото варіанта'
                                        src='https://placehold.co/600x400?text=Варіант'
                                        width={150}
                                    ></img>}
                        </CardBlock>

                        {state.imageUrl && <CardBlock
                            className="grid gap-2 "
                        >
                            <TextBlock
                                className=""
                            >{state?.imageUrl?.slice(0, 20)}...</TextBlock>

                            <ButtonBlock
                                className="red-b"
                                onClick={() => setState({ ...state, imageUrl: '' })}
                            >
                                <CancelIcon size={24} /> Очистити
                            </ButtonBlock>

                        </CardBlock>
                        }

                    </CardBlock>






                </CardBlock>




                <CardBlock className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">

                    <TextBlock
                        className="text-center text-xs"
                    >
                        Артикул має бути більшим за {compVariants?.at(-1).artikul}
                    </TextBlock>


                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                            placeholder="Наприклад 9999-0000"
                            className={`${isExist && 'border-red-500 focus:border-red-500 '}`}
                        />
                    </CardBlock>

                    <CardBlock
                        className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label
                            className=" justify-self-center self-center md:justify-self-start" htmlFor="title">
                            Назва:
                        </label>
                        <InputBlock
                            type="text"
                            id="title"
                            name="title"
                            autoComplete="off"
                            value={state.title}
                            onChange={handleChange}
                            placeholder="Кулька 10 дюймів..."
                        />
                    </CardBlock>


                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

                    <CardBlock className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                </CardBlock>




                <CardBlock
                    className="flex flex-col gap-2 bg-slate-500/10 p-2 rounded-xl ">


                    <TextBlock className="text-xs text-yellow-500 italic">
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
                            Chudo:
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


                {isExist && <TextBlock
                    className="text-red-500"
                >
                    Цей варіант вже аналізується
                </TextBlock>}



                <CardBlock className="grid grid-cols-2 ">


                    <ButtonBlock
                        className="red-b flex justify-center items-center"
                        onClick={() => setIsShowModalCreateCompVariant(false)}
                    >
                        <TextBlock className=""><CancelIcon /></TextBlock>
                        <TextBlock className=""> Скасувати</TextBlock>

                    </ButtonBlock>



                    <ButtonBlock
                        disabled={!state.artikul || !state.title || isExist || isCompVariantCreating}
                        type="submit"
                        className="green-b flex justify-center items-center"

                        onClick={() =>
                            handleCreateCompVariant({
                                artikul: state.artikul,
                                prod: state.prod,
                                size: state.size,
                                title: state.title,
                                imageUrl: state.imageUrl,
                                competitorsLinks: {
                                    sharteLink: state.sharteLink,
                                    yumiLink: state.yumiLink,
                                    airLink: state.airLink,
                                    bestLink: state.bestLink,

                                    aeroLink: state.aeroLink,
                                    balunLink: state.balunLink,
                                    svyatoLink: state.svyatoLink,
                                    ideaLink: state.ideaLink,
                                    chudoLink: state.chudoLink
                                }
                            })


                        }
                    >


                        {isCompVariantCreating ?

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

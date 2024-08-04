import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, InputBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'
import useCompStore from '../../stores/compStore'
import useFetchArts from '../../../../hooks/useFetchArts'
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons'
import useFetchAllComps from '../../hooks/useFetchAllComps'
import { categories, subcategories, } from '../../../../constants/compsData'
import { toast } from 'react-toastify';

export default function TransferCompVariantModal({
    isShowModalTransferCompVariant,
    setIsShowModalTransferCompVariant,
    compVariant,
    compStamp,

}) {

    const { createComp, updateCompVariantById, updateCompStampById, comps } = useCompStore()
    const { artsDB } = useFetchArts()
    useFetchAllComps()

    const [artikul, setArtikul] = useState("")
    const [isCompVariantTransfering, setIsCompVariantTransfering] = useState(false)


    const isExist = comps?.find(comp => comp.artikul === artikul)
    const artDB = artsDB?.find(art => art.artikul === artikul)



    const handleTransferCompVariant = async () => {
        if (!isExist) {
            try {
                setIsCompVariantTransfering(true);
                const newComp = {
                    artikul: artikul,
                    nameukr: artDB?.nameukr,
                    prod: compVariant?.prod,
                    category: categories[artikul?.slice(0, 2)],
                    subcategory: subcategories[artikul?.slice(0, 4)],
                    size: compVariant?.size,
                    competitorsLinks: compVariant?.competitorsLinks,

                }
                await createComp(newComp);
                await updateCompVariantById(compVariant?._id, { connect: artikul });
                await updateCompStampById(compStamp?._id, { artikul: artikul });
               
                toast.success('Варіант перенесено');
            } catch (error) {
                toast.error('Варіант не перенесено');
            } finally {
                setIsCompVariantTransfering(false);
                setIsShowModalTransferCompVariant(false);
            }
        } else {
            toast.error('Такий варіант уже існує');
        }
    }


    if (!isShowModalTransferCompVariant) return


    return (
        <ModalWrapper
            title={`Перенесення варіанту ${compVariant?.artikul}`}
            onCancel={() => setIsShowModalTransferCompVariant(false)}
        >
            <CardBlock
                className="flex flex-col gap-4 min-w-fit max-w-lg text-lg "
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
                            artikul={artikul?.length === 9 ? artikul : "1102-3092"}
                        />
                    </CardBlock>

                    <CardBlock
                        className="lg:col-span-2 flex flex-col justify-between"
                    >
                        <TextBlock
                            className="text-xl font-bold p-2 " >
                            {artDB?.nameukr}
                        </TextBlock>



                        <CardBlock>

                            <TextBlock
                                className="text-lg font-bold"
                            >
                                {categories[artikul?.slice(0, 2)]}
                            </TextBlock>

                            <TextBlock
                                className="text-base "
                            >
                                {subcategories[artikul?.slice(0, 4)]}
                            </TextBlock>

                        </CardBlock>

                    </CardBlock>

                </CardBlock>


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
                        value={artikul}
                        onChange={(e) => setArtikul(e.target.value)}
                        placeholder="Наприклад 1102-3092"
                    />
                </CardBlock>


                {isExist && <TextBlock
                    className="text-center text-red-500 font-bold"
                >
                    Цей артикул уже аналізується
                </TextBlock>}




                <CardBlock className="grid grid-cols-2 space-x-2 text-lg">


                    <ButtonBlock
                        className="red-b flex justify-center items-center"
                        onClick={() => setIsShowModalTransferCompVariant(false)}
                    >
                        <TextBlock className=""><CancelIcon /></TextBlock>
                        <TextBlock className=""> Скасувати</TextBlock>

                    </ButtonBlock>



                    <ButtonBlock
                        disabled={!artikul || isExist || isCompVariantTransfering || !artDB}
                        type="submit"
                        className="green-b flex justify-center items-center"

                        onClick={() =>
                            handleTransferCompVariant()
                        }
                    >


                        {isCompVariantTransfering ?

                            <Spinner color="green" />
                            :
                            <>
                                <TextBlock className=""><OkIcon /></TextBlock>
                                <TextBlock className="">Перенести</TextBlock>
                            </>
                        }

                    </ButtonBlock>
                </CardBlock>





            </CardBlock>
        </ModalWrapper>
    )
}

import React, { useState } from 'react'
import { shops, shopsList, availOrPriceOptions, availOrPriceList, prods, sizesList } from '../../../../constants/compsData';
import { exportCompStampByProdToExcel } from '../../../../utils/exportExcel';
import { ButtonBlock, CardBlock, ModalWrapper, TextBlock } from '../../../../components';
import { LuFilterX } from 'react-icons/lu';
import { ExcelIcon } from '../../../../components/UI/Icons';

export default function FilterCompVariantsModal({
    isShowFilterModal,
    setIsShowFilterModal,
    fullFilteredCompVariants,
    compVariants,
    compStamps,
    setFilter,
    filter,
    resetFilter,

}) {


    const prodOptions = prods;
    const sizesOptions = sizesList;


    const [shop, setShop] = useState("")
    const [availOrPrice, setAvailOrPrice] = useState("")


    const exportToExcel = async () => {
        try {
            await exportCompStampByProdToExcel(fullFilteredCompVariants, compStamps, shop, availOrPrice,);
        } catch (error) {
            console.log(error);
        }
    }







    if (!isShowFilterModal) return null

    
    return (
        <ModalWrapper
            title="Фільтр"
            onCancel={() => setIsShowFilterModal(false)}

        >
            <CardBlock
                className="flex flex-col items-center justify-between gap-2 p-2  bg-slate-600/30 rounded-xl"
            >


                <CardBlock
                    className="flex items-center justify-between w-full px-3   space-x-1"
                >

                    <TextBlock
                        className="text-lg"
                    >
                        Вибрано варіантів:	{fullFilteredCompVariants?.length} із {compVariants?.length}
                    </TextBlock>

                    <ButtonBlock
                        className="red-b flex items-center space-x-1"
                        onClick={resetFilter}
                    >
                        <TextBlock
                            className="text-xl"
                        >
                            <LuFilterX />
                        </TextBlock>
                    </ButtonBlock>

                </CardBlock>



                <CardBlock
                    className="flex flex-col gap-2">





                    <select
                        className="InputBlock focus:bg-slate-900 text-base "
                        value={filter?.prod}
                        onChange={(e) => setFilter({ ...filter, prod: e.target.value })}
                    >
                        <option
                            value="">
                            Виробник
                        </option>
                        {prodOptions?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>


                    <select
                        className="InputBlock focus:bg-slate-900 text-base"
                        value={filter?.size}
                        onChange={(e) => setFilter({ ...filter, size: e.target.value })}
                    >
                        <option
                            className=''
                            value="">
                            Розмір
                        </option>
                        {sizesOptions?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </CardBlock>


                <CardBlock className="w-full">
                    <ButtonBlock
                        className="green-b w-full"
                        onClick={() => setIsShowFilterModal(false)}
                    >
                        OK
                    </ButtonBlock>
                </CardBlock>





            </CardBlock>



            <CardBlock
                className="flex flex-col items-center justify-between gap-2 p-2  bg-slate-600/30 rounded-xl"
            >

                <CardBlock
                    className="flex flex-col gap-2">

                    <select
                        className="InputBlock focus:bg-slate-900 text-base "
                        value={shopsList.find((key) => shops[key] === shop) || ""}
                        onChange={(e) => {
                            setShop(shops[e.target.value])
                        }}
                    >
                        <option
                            value="">
                            Конкурент
                        </option>
                        {shopsList?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>


                    <select
                        className="InputBlock focus:bg-slate-900 text-base "
                        value={availOrPriceList.find((key) => availOrPriceOptions[key] === availOrPrice) || ""}
                        onChange={(e) => {
                            setAvailOrPrice(availOrPriceOptions[e.target.value])
                        }}
                    >
                        <option
                            value="">
                            В наявності / Ціна
                        </option>
                        {availOrPriceList?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </CardBlock>


                <ButtonBlock
                    className="green-b w-full"
                    onClick={exportToExcel}
                    disabled={!shop || !availOrPrice}
                >
                    <ExcelIcon />Export
                </ButtonBlock>


            </CardBlock>


        </ModalWrapper>
    )
}


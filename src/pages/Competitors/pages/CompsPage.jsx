import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW, } from '../../../components'
import useFetchAllComps from '../hooks/useFetchAllComps';

import { AddIcon, ExcelIcon, ListIcon, TableIcon } from '../../../components/UI/Icons';
import useFetchArts from '../../../hooks/useFetchArts';
import useCompStore from '../stores/compStore';
import CreateCompModal from '../components/modals/CreateCompModal';
import CompsList from '../components/Comps/CompsList';
import CompsTable from '../components/Comps/CompsTable';

import { exportToExcelComps } from "../../../utils/exportExcel";
import useFetchAllCompVariants from '../hooks/useFetchAllCompVariants';
import CompVariants from '../components/CompVariants/CompVariants';
import { BsQuestionSquare } from 'react-icons/bs';
import CreateCompVariantModal from '../components/modals/CreateCompVariantModal';



export default function CompsPage() {



    const { comps, isAllCompsLoading, error } = useFetchAllComps();
    const { compVariants, isAllCompVariantsLoading, error: errorCompVariants } = useFetchAllCompVariants();
    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();





    const [isShowModalCreateComp, setIsShowModalCreateComp] = useState(false)
    const [isShowModalCreateCompVariant, setIsShowModalCreateCompVariant] = useState(false)



    const [tab, setTab] = useState("list")





    return (
        <PageBTW
            isLoading={isAllCompsLoading || loadingArtsDB}
            error={error || errorArtsDB || errorCompVariants}
        >

            <HeaderBlock
                className="bg-fuchsia-500 shadow-sm shadow-fuchsia-500"
            >
                Конкуренти
            </HeaderBlock>


            <ButtonGroup>

                <ButtonGroup.Navigation
                    className="grid lg:grid-cols-3 gap-2"
                >

                    <ButtonBlock
                        className={` ${tab === "list" ? "fuchsia-b-n" : "fuchsia-b"} gap-2 `}
                        onClick={() => setTab("list")}
                    >
                        <ListIcon size={24} /> <span>Список</span>
                    </ButtonBlock>

                    <ButtonBlock
                        className={` ${tab === "table" ? "fuchsia-b-n" : "fuchsia-b"} gap-2`}
                        onClick={() => setTab("table")}
                    >
                        <TableIcon size={20} /> <span>Таблиця</span>
                    </ButtonBlock>

                    <ButtonBlock
                        className={` ${tab === "variants" ? "fuchsia-b-n" : "fuchsia-b"} gap-2`}
                        onClick={() => setTab("variants")}
                    >
                        <BsQuestionSquare size={20} /> <span>Варіанти</span>
                    </ButtonBlock>



                </ButtonGroup.Navigation>

                <ButtonGroup.Actions>



                    <ButtonBlock
                        className="sky-b"
                        onClick={() => setIsShowModalCreateComp(true)}
                    >
                        <AddIcon /> Артикул
                    </ButtonBlock>

                    <ButtonBlock
                        className="violet-b"
                        onClick={() => setIsShowModalCreateCompVariant(true)}
                    >
                        <AddIcon /> Варіант
                    </ButtonBlock>

                    <ButtonBlock
                        className="emerald-b"
                        onClick={() => exportToExcelComps(comps)}
                    >
                        <ExcelIcon /> Експортувати
                    </ButtonBlock>

                </ButtonGroup.Actions>
            </ButtonGroup>


            <CreateCompModal
                isShowModalCreateComp={isShowModalCreateComp}
                setIsShowModalCreateComp={setIsShowModalCreateComp}
                artsDB={artsDB}
                comps={comps}

            />

            <CreateCompVariantModal 
            isShowModalCreateCompVariant={isShowModalCreateCompVariant}
            setIsShowModalCreateCompVariant={setIsShowModalCreateCompVariant}
            compVariants={compVariants}   
            />





            {tab === "list" && <CompsList
                comps={comps}
            />}


            {tab === "table" && <CompsTable
                comps={comps}
            />}

            {tab === "variants" && <CompVariants
                compVariants={compVariants}
            />}



        </PageBTW>
    )
}

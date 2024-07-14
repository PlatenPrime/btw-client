import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW, } from '../../../components'
import useFetchAllComps from '../hooks/useFetchAllComps';

import { AddIcon, ExcelIcon, ListIcon, TableIcon } from '../../../components/UI/Icons';
import useFetchArts from '../../../hooks/useFetchArts';
import useCompStore from '../stores/compStore';
import CreateCompModal from '../components/modals/CreateCompModal';
import CompsList from '../components/CompsList';
import CompsTable from '../components/CompsTable';

import {exportToExcelComps} from "../../../utils/exportExcel";



export default function CompsPage() {



    const { comps, isAllCompsLoading, error } = useFetchAllComps();
    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();


    const { createComp } = useCompStore()


    const [isShowModalCreateComp, setIsShowModalCreateComp] = useState(false)



    const [isList, setIsList] = useState(true)

    return (
        <PageBTW
            isLoading={isAllCompsLoading || loadingArtsDB}
        >

            <HeaderBlock
                className="bg-fuchsia-500 shadow-sm shadow-fuchsia-500"
            >
                Конкуренти
            </HeaderBlock>


            <ButtonGroup>

                <ButtonGroup.Navigation
                    className="grid grid-cols-2 gap-2"
                >

                    <ButtonBlock
                        className={` ${isList ? "fuchsia-b-n" : "fuchsia-b"} gap-2 `}
                        onClick={() => setIsList(true)}
                    >
                        <ListIcon size={24}/> <span>Список</span>  
                    </ButtonBlock>

                    <ButtonBlock
                        className={` ${!isList ? "fuchsia-b-n" : "fuchsia-b"} gap-2`}
                        onClick={() => setIsList(false)}
                    >
                        <TableIcon size={20}/> <span>Таблиця</span> 
                    </ButtonBlock>

                </ButtonGroup.Navigation>

                <ButtonGroup.Actions>



                    <ButtonBlock
                        className="green-b"
                        onClick={() => setIsShowModalCreateComp(true)}
                    >
                        <AddIcon /> Додати артикул
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


            {isList && <CompsList
                comps={comps}
            />}


            {!isList && <CompsTable
                comps={comps}
            />}



        </PageBTW>
    )
}

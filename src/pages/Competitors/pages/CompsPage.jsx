import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW, } from '../../../components'
import useFetchAllComps from '../hooks/useFetchAllComps';

import { AddIcon, ExcelIcon } from '../../../components/UI/Icons';
import useFetchArts from '../../../hooks/useFetchArts';
import useCompStore from '../stores/compStore';
import CreateCompModal from '../components/modals/CreateCompModal';
import CompsList from '../components/CompsList';
import CompsTable from '../components/CompsTable';

export default function NewCompsPage() {



    const { comps, isAllCompsLoading, error } = useFetchAllComps();
    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();


    const { createComp } = useCompStore()


    const [isCompCreating, setIsCompCreating] = useState(false)
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

                <ButtonGroup.Navigation>

                    {!isList && <ButtonBlock
                        className="fuchsia-b-n"
                        onClick={() => setIsList(true)}
                    >
                        Список
                    </ButtonBlock>}

                    {isList && <ButtonBlock
                        className="fuchsia-b-n"
                        onClick={() => setIsList(false)}
                    >
                        Таблиця
                    </ButtonBlock>}

                </ButtonGroup.Navigation>

                <ButtonGroup.Actions>



                    <ButtonBlock
                        className="green-b"
                        onClick={() => setIsShowModalCreateComp(true)}
                    >
                        <AddIcon /> Додати артикул
                    </ButtonBlock>

                    <ButtonBlock>
                        <ExcelIcon /> Експортувати
                    </ButtonBlock>

                </ButtonGroup.Actions>
            </ButtonGroup>


            <CreateCompModal
                isShowModalCreateComp={isShowModalCreateComp}
                setIsShowModalCreateComp={setIsShowModalCreateComp}
                artsDB={artsDB}
                comps={comps}
                isCompCreating={isCompCreating}
                setIsCompCreating={setIsCompCreating}
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

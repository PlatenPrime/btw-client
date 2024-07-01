import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputSearch, PageBTW, PaginationBlock, TextBlock } from '../../../components'
import useFetchAllComps from '../hooks/useFetchAllComps';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { AddIcon, ExcelIcon } from '../../../components/UI/Icons';
import useFetchArts from '../../../hooks/useFetchArts';
import CompBage from '../components/CompBage';
import useCompStore from '../stores/compStore';
import CreateCompModal from '../components/modals/CreateCompModal';

export default function NewCompsPage() {





    const { comps, isAllCompsLoading, error } = useFetchAllComps();
    const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();


    const { createComp } = useCompStore()


    const [isCompCreating, setIsCompCreating] = useState(false)
    const [isShowModalCreateComp, setIsShowModalCreateComp] = useState(false)




    const [filteredComps, setFilteredComps] = useState([]);
    const [page, setPage] = useState(1);
    const step = 10

    useEffect(() => {
        setFilteredComps(comps)
    }, [comps])




    function handleFilterComps(searchValue) {
        const filtered = comps.filter((comp) =>
            comp.nameukr.toLowerCase().includes(searchValue.toLowerCase().trim())
        );

        if (filtered.length === 0) {
            toast.info("По запиту нічого не знайдено")
        }

        setFilteredComps(filtered);
        setPage(1)

    }


    const handleSearch = useDebouncedCallback((term) => {
        handleFilterComps(term)
    }, 500);





    return (
        <PageBTW
            isLoading={isAllCompsLoading || loadingArtsDB}

        >


            <HeaderBlock
                className="bg-fuchsia-500 shadow-lg shadow-fuchsia-500"
            >
                Конкуренти
            </HeaderBlock>


            <ButtonGroup>

                <ButtonGroup.Navigation>

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
            />





            <ContainerBlock>
                <InputSearch
                    handleSearch={handleSearch}
                    placeholder="Пошук за назвою"
                />

                <PaginationBlock
                    allItems={comps}
                    filteredItems={filteredComps}
                    page={page}
                    step={step}
                    setPage={setPage}
                />

                <CardBlock
                    className="space-y-2"
                >
                    {
                        filteredComps?.length === 0 &&
                        <TextBlock>Нічого не знайдено</TextBlock>
                    }
                    {
                        filteredComps?.length !== 0 &&
                        filteredComps?.slice(step * page - step, step * page).map(comp =>

                            <CompBage
                                key={comp._id}
                                comp={comp}
                            />
                        )
                    }

                </CardBlock>
            </ContainerBlock>

        </PageBTW>
    )
}

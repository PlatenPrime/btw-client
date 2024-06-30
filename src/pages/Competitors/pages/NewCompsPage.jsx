import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputSearch, PageBTW, PaginationBlock, TextBlock } from '../../../components'
import useFetchAllComps from '../hooks/useFetchAllComps';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { AddIcon } from '../../../components/UI/Icons';

export default function NewCompsPage() {


    const { comps, isAllCompsLoading, error } = useFetchAllComps();


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
        <PageBTW>


            <HeaderBlock
                className="bg-fuchsia-500 shadow-lg shadow-fuchsia-500"
            >
                Конкуренти
            </HeaderBlock>


            <ButtonGroup>

                <ButtonGroup.Navigation>

                </ButtonGroup.Navigation>

                <ButtonGroup.Actions>
                    <ButtonBlock>
                        <AddIcon /> Додати артикул
                    </ButtonBlock>
                </ButtonGroup.Actions>
            </ButtonGroup>



            <ContainerBlock>
                <InputSearch
                    handleSearch={handleSearch}
                    placeholder="Пошук"
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
                        <TextBlock>Нічого не зндено</TextBlock>
                    }
                    {
                        filteredComps?.length !== 0 &&
                        filteredComps?.slice(step * page - step, step * page).map(comp =>
                            <div
                                key={comp._id}
                                className="bg-gradient-to-b from-fuchsia-500/50 to-fuchsia-700/50 p-2 rounded-lg">
                                {comp.nameukr}
                            </div>)
                    }

                </CardBlock>
            </ContainerBlock>

        </PageBTW>
    )
}

import React, { useEffect, useState } from 'react'
import { CardBlock, ContainerBlock, InputSearch, PaginationBlock, TextBlock } from '../../../components'
import CompBage from './CompBage'
import { toast } from 'react-toastify'
import { useDebouncedCallback } from 'use-debounce'

export default function CompsList({
    comps,
}) {




    const [filteredComps, setFilteredComps] = useState([]);
    const [page, setPage] = useState(1);
    const step = 10

    useEffect(() => {
        setFilteredComps(comps)
    }, [comps])




    function handleFilterComps(searchValue) {
        const filtered = comps?.filter((comp) =>
            comp?.nameukr?.toLowerCase().includes(searchValue.toLowerCase().trim())
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
    )
}

import React, { useEffect, useState } from 'react'
import { ContainerBlock, InputSearch, TextBlock } from '../../../../components'
import CompVariantBage from '../CompVariant/CompVariantBage'
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

export default function CompVariants({
    compVariants
}) {




    const [filteredCompVariants, setFilteredCompVariants] = useState([]);



    useEffect(() => {
        setFilteredCompVariants(compVariants)
    }, [compVariants])




    function handleFilterCompVariants(searchValue) {
        const filtered = compVariants?.filter((cv) =>
            cv?.title?.toLowerCase().includes(searchValue.toLowerCase().trim())
        );

        if (filtered.length === 0) {
            toast.info("По запиту нічого не знайдено")
        }

        setFilteredCompVariants(filtered);


    }


    const handleSearch = useDebouncedCallback((term) => {
        handleFilterCompVariants(term)
    }, 500);



    return (

        <ContainerBlock
            className="grid gap-2"
        >
            <InputSearch
                handleSearch={handleSearch}
                placeholder="Пошук за назвою"
            />


            <ContainerBlock
                className="grid md:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-4  gap-2 "
            >

                {compVariants?.length < 1 && (
                    <TextBlock
                        className="  italic"
                    >
                        Варіантів немає
                    </TextBlock>
                )}

                {filteredCompVariants.length !== 0 &&
                    filteredCompVariants.map(compVariant => (
                            <CompVariantBage
                                key={compVariant?._id}
                                compVariant={compVariant}
                            />
                        ))}

            </ContainerBlock>
        </ContainerBlock>
    )
}

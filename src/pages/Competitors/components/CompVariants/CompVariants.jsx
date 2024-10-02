import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, InputSearch, TextBlock } from '../../../../components'
import CompVariantBage from '../CompVariant/CompVariantBage'
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { FilterIcon } from '../../../../components/UI/Icons';
import FilterCompVariantsModal from '../modals/FilterCompVariantsModal';

export default function CompVariants({
    compVariants,
    compStamps,
}) {

    const [filteredCompVariants, setFilteredCompVariants] = useState([]);
    const [isShowFilterModal, setIsShowFilterModal] = useState(false)

    const [filter, setFilter] = useState({
        prod: '',
        size: "",
    });



    useEffect(() => {
        setFilteredCompVariants(compVariants)
    }, [compVariants])


    function handleFilterCompVariants(searchValue) {
        const filtered = compVariants?.filter((cv) =>
            cv?.title?.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
        cv?.artikul?.toLowerCase().includes(searchValue.toLowerCase().trim())
        );
        if (filtered.length === 0) {
            toast.info("По запиту нічого не знайдено")
        }
        setFilteredCompVariants(filtered);
    }


    const handleSearch = useDebouncedCallback((term) => {
        handleFilterCompVariants(term)
    }, 500);


    const fullFilteredCompVariants = filteredCompVariants?.filter((cv) => {
        return (
            (filter?.prod === '' || cv?.prod === filter?.prod) &&
            (filter?.size === '' || cv?.size === filter?.size)
        );
    })

    const resetFilter = () => {
        setFilter({
            prod: '',
            size: '',
        });
    };




    return (

        <>

            <FilterCompVariantsModal
                isShowFilterModal={isShowFilterModal}
                setIsShowFilterModal={setIsShowFilterModal}
                fullFilteredCompVariants={fullFilteredCompVariants}
                compVariants={compVariants}
                compStamps={compStamps}
                setFilter={setFilter}
                filter={filter}
                resetFilter={resetFilter}

            />

            <ContainerBlock
                className="grid gap-2"
            >

                <CardBlock
                    className="flex justify-center items-center gap-2"
                >
                    <InputSearch
                        handleSearch={handleSearch}
                        placeholder="Пошук за назвою"
                    />


                    <ButtonBlock
                        className="violet-b"
                        onClick={() => setIsShowFilterModal(true)}
                        
                    >
                        <FilterIcon size={20} />
                    </ButtonBlock>
                </CardBlock>

                <CardBlock
                    className="grid md:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-4  gap-2 "
                >

                    {!compVariants?.length && (
                        <TextBlock
                            className="  italic"
                        >
                            Варіантів немає
                        </TextBlock>
                    )}

                    {fullFilteredCompVariants?.length !== 0 &&
                        fullFilteredCompVariants?.map(compVariant => (
                            <CompVariantBage
                                key={compVariant?._id}
                                compVariant={compVariant}
                            />
                        ))}

                </CardBlock>
            </ContainerBlock>
        </>
    )
}

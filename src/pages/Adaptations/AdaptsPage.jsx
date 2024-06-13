import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalCreate, PageBTW, Spinner, TextBlock } from '../../components'
import useAdaptsStore from './stores/adaptsStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdaptBage from './components/AdaptBage';
import useFetchAllAdapts from './hooks/useFetchAllAdapts';
import { AddIcon } from '../../components/UI/Icons';


export default function AdaptsPage() {





    const { createAdapt } = useAdaptsStore();

    const { adapts, isLoadingAllAdapts } = useFetchAllAdapts();



    const [isAdaptsLoading, setIsAdaptsLoading] = useState(false);


    const [isAdaptCreating, setIsAdaptCreating] = useState(false);

    const [isShowModalAdaptCreating, setIsShowModalAdaptCreating] = useState(false);




    const handleAdaptCreate = async (createData) => {
        try {
            setIsAdaptCreating(true);

            await createAdapt(createData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsAdaptCreating(false);
            setIsShowModalAdaptCreating(false);
        }
    }


    return (

        <PageBTW
            isLoading={isAdaptsLoading}
        >
            <HeaderBlock
                className="bg-green-500 shadow-lg shadow-green-500"
            >
                Адаптації
            </HeaderBlock>



            <ButtonGroup>
                <ButtonGroup.Actions>
                    <ButtonBlock
                        className="green-b"
                        onClick={() => { setIsShowModalAdaptCreating(true) }}
                    >
                        <AddIcon />
                        Створити адаптацію
                    </ButtonBlock>
                </ButtonGroup.Actions>


            </ButtonGroup>


            {/* MODALS */}


            {isShowModalAdaptCreating && <ModalCreate
                title="Створення інтеграції"
                onConfirm={(newAdaptTitle) => handleAdaptCreate({ title: newAdaptTitle })}
                onCancel={() => setIsShowModalAdaptCreating(false)}
                isCreating={isAdaptCreating}
            />}

            {/* MODALS END */}






            <ContainerBlock className="flex flex-col gap-4">
                {adapts?.map((adapt) => (
                    <AdaptBage adapt={adapt} />
                ))}
            </ContainerBlock>





        </PageBTW >

    )
}

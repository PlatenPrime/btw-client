import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalCreate, PageBTW } from '../../components'
import useAdaptsStore from './stores/adaptsStore';
import AdaptBage from './components/AdaptBage';
import useFetchAllAdapts from './hooks/useFetchAllAdapts';
import { AddIcon } from '../../components/UI/Icons';


export default function AdaptsPage() {


    const { adapts, isLoadingAllAdapts } = useFetchAllAdapts();


    const { createAdapt } = useAdaptsStore();
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
            isLoading={isLoadingAllAdapts}
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


            {isShowModalAdaptCreating && <ModalCreate
                title="Створення інтеграції"
                onConfirm={(newAdaptTitle) => handleAdaptCreate({ title: newAdaptTitle })}
                onCancel={() => setIsShowModalAdaptCreating(false)}
                isCreating={isAdaptCreating}
            />}


            <ContainerBlock className="flex flex-col gap-4">
                {adapts?.map((adapt) => (
                    <AdaptBage adapt={adapt} />
                ))}
            </ContainerBlock>

        </PageBTW >

    )
}

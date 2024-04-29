import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, PageBTW, Spinner, TextBlock } from '../../components'
import useAdaptsStore from './stores/adaptsStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdaptBage from './components/AdaptBage';
import AdaptSpinnerContainer from './components/AdaptSpinnerContainer';

export default function AdaptsPage() {


   


    const { adapts, getAllAdapts, createAdapt } = useAdaptsStore();



    const [isAdaptsLoading, setIsAdaptsLoading] = useState(false);


    const [isAdaptCreating, setIsAdaptCreating] = useState(false);

    const [isShowModalAdaptCreating, setIsShowModalAdaptCreating] = useState(false);




    useEffect(() => {




        const fetchAdapts = async () => {


            try {
                setIsAdaptsLoading(true);
                await getAllAdapts()
            } catch (error) {
                console.error('Помилка завантаження інтеграцій:', error);
            } finally {
                setIsAdaptsLoading(false);
            }
        }

        fetchAdapts()



    }, [getAllAdapts]);



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

        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Адаптації
            </HeaderBlock>


            {/* MODALS */}


            {isShowModalAdaptCreating && <ModalCreate
                title="Створення інтеграції"
                onConfirm={(newAdaptTitle) => handleAdaptCreate({ title: newAdaptTitle })}
                onCancel={() => setIsShowModalAdaptCreating(false)}
                isCreating={isAdaptCreating}
            />}

            {/* MODALS END */}



            <ButtonGroup>

                <ButtonBlock
                    className="green-b"
                    onClick={() => { setIsShowModalAdaptCreating(true) }}
                >
                    Створити адаптацію
                </ButtonBlock>
            </ButtonGroup>



            {
                isAdaptsLoading
                    ?
                    <AdaptSpinnerContainer />

                    :
                    <ContainerBlock className="flex flex-col gap-4">
                        {adapts?.map((adapt) => (
                            <AdaptBage adapt={adapt} />
                        ))}
                    </ContainerBlock>

            }



        </PageBTW >

    )
}

import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, PageBTW, Spinner, TextBlock } from '../../components'
import useAdaptsStore from './stores/adaptsStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdaptsPage() {


    const navigate = useNavigate()


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
                Інтеграції
            </HeaderBlock>


            {/* MODALS */}


            {isShowModalAdaptCreating && <ModalCreate
                title="Створення інтеграції"
                onConfirm={(newAdaptTitle) => handleAdaptCreate({ title: newAdaptTitle })}
                onCancel={() => setIsShowModalAdaptCreating(false)}
                isCreating={isAdaptCreating}
            />}




            Ada











            <ButtonGroup>

                <ButtonBlock
                    className="green-b"
                    onClick={() => { setIsShowModalAdaptCreating(true) }}
                >
                    Створити інтеграцію
                </ButtonBlock>
            </ButtonGroup>



            {
                isAdaptsLoading ? (
                    <ContainerBlock ContainerBlock
                        className="w-full h-full flex justify-start items-center"
                    >
                        <Spinner color="rgb(34 197 94)" />
                    </ContainerBlock>
                ) : (
                    <ContainerBlock className="flex flex-col gap-4">
                        {adapts?.map((adapt) => (

                            <CardBlock
                                onClick={() => navigate(`/adapts/${adapt._id}`)}
                                key={adapt._id}
                                className="text-center text-3xl p-4 bg-green-500/20 hover:bg-green-500 rounded-xl cursor-pointer transition duration-500 ease-in-out"
                            >
                                {adapt.title}
                            </CardBlock>

                        ))}
                    </ContainerBlock>
                )
            }





        </PageBTW >

    )
}

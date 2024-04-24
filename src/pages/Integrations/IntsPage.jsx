import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, PageBTW, Spinner, TextBlock } from '../../components'
import useIntsStore from './stores/IntsStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function IntsPage() {


    const navigate = useNavigate()


    const { ints, getAllInts, createInt } = useIntsStore();



    const [isIntsLoading, setIsIntsLoading] = useState(false);


    const [isIntCreating, setIsIntCreating] = useState(false);

    const [isShowModalIntCreating, setIsShowModalIntCreating] = useState(false);




    useEffect(() => {




        const fetchInts = async () => {


            try {
                setIsIntsLoading(true);
                await getAllInts()
            } catch (error) {
                console.error('Помилка завантаження інтеграцій:', error);
            } finally {
                setIsIntsLoading(false);
            }
        }

        fetchInts()



    }, [getAllInts]);



    const handleIntCreate = async (createData) => {
        try {
            setIsIntCreating(true);

            await createInt(createData)

        } catch (error) {
            console.log(error);

        } finally {
            setIsIntCreating(false);
            setIsShowModalIntCreating(false);
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


            {isShowModalIntCreating && <ModalCreate
                title="Створення інтеграції"
                onConfirm={(newIntTitle) => handleIntCreate({ title: newIntTitle })}
                onCancel={() => setIsShowModalIntCreating(false)}
                isCreating={isIntCreating}
            />}



















            <ButtonGroup>

                <ButtonBlock
                    className="green-b"
                    onClick={() => { setIsShowModalIntCreating(true) }}
                >
                    Створити інтеграцію
                </ButtonBlock>
            </ButtonGroup>



            {
                isIntsLoading ? (
                    <ContainerBlock
                        className="w-full h-full flex justify-start items-center"
                    >
                        <Spinner color="rgb(34 197 94)" />
                    </ContainerBlock>
                ) : (
                    <ContainerBlock className="flex flex-col gap-4">
                        {ints?.map((int) => (

                            <CardBlock
                                onClick={() => navigate(`/ints/${int._id}`)}
                                key={int._id}
                                className="text-center text-3xl p-4 bg-green-500/20 hover:bg-green-500 rounded-xl cursor-pointer transition duration-500 ease-in-out"
                            >
                                {int.title}
                            </CardBlock>

                        ))}
                    </ContainerBlock>
                )
            }





        </PageBTW >

    )
}

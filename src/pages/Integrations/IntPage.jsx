import React from 'react'
import { ContainerBlock, HeaderBlock, PageBTW, Spinner } from '../../components'
import { useParams } from 'react-router-dom';
import useIntsStore from './stores/IntsStore';
import { useEffect } from 'react';

export default function IntPage() {

    const { id } = useParams();

    const { int, getIntById } = useIntsStore();


    console.log(int);


    const [error, setError] = React.useState(null);
    const [isIntLoading, setIsIntLoading] = React.useState(false);



    useEffect(() => {

        const fetchIntById = async () => {
            try {
                setIsIntLoading(true);
                await getIntById(id)
            } catch (error) {
                console.error('Помилка завантаження інтеграції:', error);
            } finally {
                setIsIntLoading(false);
            }
        }

        fetchIntById()

    }, [getIntById, id]);






    return (
        <PageBTW>
            <HeaderBlock>
                Інтеграція
            </HeaderBlock>

            {isIntLoading ?
                (
                    <ContainerBlock
                        className="w-full h-full flex justify-start items-center"
                    >
                        <Spinner color="rgb(34 197 94)" />
                    </ContainerBlock>
                )
                :
                (
                    <p>Інтеграція: {int?.int?.title}</p>
                )}





        </PageBTW >
    )
}

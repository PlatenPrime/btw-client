import React from 'react'
import { CardBlock, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import useFetchAdaptTestById from './hooks/useFetchAdaptTestById';
import { useParams } from 'react-router-dom';
import { Container } from 'postcss';

export default function AdaptTestPage() {




    const { id } = useParams();

    const { test, adapt, isAdaptTestLoading, error } = useFetchAdaptTestById(id);











    return (
        <PageBTW
            isLoading={isAdaptTestLoading}

        >

            <HeaderBlock
                className="bg-purple-500 shadow-lg shadow-purple-500"
            >
                Тест "{adapt?.title}"
            </HeaderBlock>


            <ContainerBlock>

                {test?._id}

                {test?.questions?.map((question, index) => (
                    <CardBlock>

                        <TextBlock className="text-2xl" >{question?.questionText}</TextBlock>
                        {question?.options?.map((option, index) => (
                            <TextBlock>{index + 1}. {option}</TextBlock>
                        ))}
                        <TextBlock>{question?.correctOption}</TextBlock>
                    </CardBlock>
                ))}

            </ContainerBlock>



        </PageBTW>
    )
}

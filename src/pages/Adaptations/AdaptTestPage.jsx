import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import useFetchAdaptTestById from './hooks/useFetchAdaptTestById';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'postcss';
import { BackIcon, CancelIcon, DeleteIcon, DoneIcon, EditIcon, TestIcon } from '../../components/UI/Icons';

export default function AdaptTestPage() {




    const { id } = useParams();
    const navigate = useNavigate();




    const { test, adapt, isAdaptTestLoading, error } = useFetchAdaptTestById(id);



    const [isTestEditing, setIsTestEditing] = useState(false);











    return (
        <PageBTW
            isLoading={isAdaptTestLoading}

        >

            <HeaderBlock
                className="bg-lime-500 shadow-lg shadow-lime-500 "
            >
                Тест "{adapt?.title}"
            </HeaderBlock>


            <ButtonGroup>

                <ButtonGroup.Navigation>
                    <ButtonBlock
                        className="green-b-n"
                        onClick={() => navigate(`/adapts/${test?.adaptId}`)}
                    >
                        <BackIcon /> Адаптація
                    </ButtonBlock>
                </ButtonGroup.Navigation>

                <ButtonGroup.Actions>
                    <ButtonBlock
                        className="lime-b"
                    >
                        <TestIcon />  Пройти
                    </ButtonBlock>

                    {!isTestEditing && <ButtonBlock
                        className="blue-b"
                        onClick={() => setIsTestEditing(true)}
                    >
                        <EditIcon />  Редагувати
                    </ButtonBlock>
                    }


                    {isTestEditing &&

                        <>
                            <ButtonBlock
                                className="fuchsia-b"
                                onClick={() => setIsTestEditing(false)}
                            >
                                <CancelIcon />
                                Скасувати
                            </ButtonBlock>

                            <ButtonBlock
                                className="green-b"
                            // onClick={() => setIsShowModalInsUpdating(true)}
                            >
                                <DoneIcon />
                                Зберегти
                            </ButtonBlock>

                            <ButtonBlock
                                className="red-b"
                            >
                                <DeleteIcon />  Видалити
                            </ButtonBlock>
                        </>
                    }
                </ButtonGroup.Actions>

            </ButtonGroup>


            <ContainerBlock>




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

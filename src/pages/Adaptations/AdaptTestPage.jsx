import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import useFetchAdaptTestById from './hooks/useFetchAdaptTestById';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'postcss';
import { BackIcon, CancelIcon, DeleteIcon, DoneIcon, EditIcon, TestIcon } from '../../components/UI/Icons';
import AdaptTestEditContainer from './components/AdaptTestEditContainer';
import AdaptTestContainer from './components/AdaptTestContainer';

export default function AdaptTestPage() {




    const { id } = useParams();
    const navigate = useNavigate();




    const { test, adapt, isAdaptTestLoading, error } = useFetchAdaptTestById(id);



    const [isTestEditing, setIsTestEditing] = useState(false);

    const [isTestPassing, setIsTestPassing] = useState(false);











    return (
        <PageBTW
            isLoading={isAdaptTestLoading}
            error={error}
        >

            <HeaderBlock
                 className="bg-gradient-to-b  from-lime-700/50  to-lime-400 shadow-md shadow-lime-500 "
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


       

                {isTestEditing && <AdaptTestEditContainer
                    adapt={adapt}
                    test={test}
                    setIsTestEditing={setIsTestEditing}
                />}


                {
                    !isTestEditing && <AdaptTestContainer 
                    
                    
                    
                    />
                }



        </PageBTW>
    )
}

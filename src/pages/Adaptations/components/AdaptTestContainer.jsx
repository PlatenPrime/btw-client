import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, TextBlock } from '../../../components'

export default function AdaptTestContainer({
    test,

}) {



    const [isTestPassing, setIsTestPassing] = useState(false);




    return (
        <ContainerBlock
            className=" flex flex-col items-center"
        >


            {!isTestPassing &&
                <ButtonBlock
                    className="lime-b-n  text-2xl"
                    onClick={() => setIsTestPassing(true)}
                >
                    Почати
                </ButtonBlock>}




            {isTestPassing &&
                <CardBlock className="flex flex-col items-center">
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    <TextBlock>Тест</TextBlock>
                    
                
                    <ButtonBlock
                        className="green-b-n  text-2xl"
                        onClick={() => setIsTestPassing(false)}
                    >
                        Завершити
                    </ButtonBlock>

                </CardBlock>
            }




        </ContainerBlock>
    )
}

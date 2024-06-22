import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock } from '../../../components'

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





            <CardBlock>
                Поля тесту
            </CardBlock>


            {isTestPassing && <ButtonBlock
                className="green-b-n  text-2xl"
                onClick={() => setIsTestPassing(false)}
            >
                Завершити
            </ButtonBlock>
            }




        </ContainerBlock>
    )
}

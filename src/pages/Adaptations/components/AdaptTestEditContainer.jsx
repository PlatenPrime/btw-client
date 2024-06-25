import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, InputBlock, TextBlock } from '../../../components'
import { AddIcon, DeleteIcon, EditIcon } from '../../../components/UI/Icons';
import useTestsStore from '../stores/adaptTestsStore';





export default function AdaptTestEditContainer({
  test
}) {








  return (
    <ContainerBlock
      className="flex flex-col items-center gap-2"

    >

      {test?.questions?.map((question) => (
        <CardBlock
          key={question?.questionText}
          className="flex flex-col items-center bg-gradient-to-b from-lime-700/50 to-lime-900/50 p-2 rounded-xl"
        >
          
          <InputBlock 
          className="w-full"
          value={question?.questionText}
          />

          <CardBlock
            className="grid gap-2"
          >
            {question?.options?.map((option, i) => (
              <CardBlock
                key={i}
                className="flex gap-2"
              >

                <InputBlock
                  value={option}
                  type="text"
                  // name={i}
                  className=""
                />

                <ButtonBlock className="red-b" ><DeleteIcon /></ButtonBlock>


              </CardBlock>
            ))}


            <ButtonBlock
              className="lime-b"
            >
              <AddIcon />
            </ButtonBlock>
          </CardBlock>

        </CardBlock>

      ))}


      <ButtonBlock
        className="lime-b-n  text-xl "
      >
        <AddIcon />
      </ButtonBlock>

    </ContainerBlock>
  )
}

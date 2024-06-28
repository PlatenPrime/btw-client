import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, InputBlock, TextBlock } from '../../../components'
import { AddIcon, DeleteIcon, EditIcon, MoveVertIcon } from '../../../components/UI/Icons';
import useTestsStore from '../stores/adaptTestsStore';





export default function AdaptTestEditContainer({
  test
}) {








  return (
    <ContainerBlock
      className="flex flex-col  gap-2"

    >

      {test?.questions?.map((question, i) => (

        // TODO: Перенести маппируемый блок в AdaptTestQuestionBage.jsx

        <CardBlock
          key={question?.questionText}
          className=" flex flex-col  gap-2 bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 rounded-xl"
        >

          <TextBlock className="text-2xl" >{question?.questionText}</TextBlock>

          <CardBlock>
            {
              question?.options?.map((option, i) =>
                <TextBlock
                  key={option}>
                  {i + 1}  {option}
                </TextBlock>
              )}
          </CardBlock>

          <TextBlock>Правильна відповідь: {question?.correctOption + 1}</TextBlock>

          <CardBlock
            className="flex justify-center items-stretch  gap-2  w-full"
          >

            <ButtonBlock
              className="blue-b lg:max-w-lg active:cursor-grabbing"
            >
              <MoveVertIcon />
            </ButtonBlock>


            <ButtonBlock
              className="blue-b lg:max-w-lg"
            >
              <EditIcon />
            </ButtonBlock>
          </CardBlock>


        </CardBlock>

      ))}


      <ButtonBlock
        className="lime-b border-dashed  w-full text-xl "
      >
        <AddIcon />
      </ButtonBlock>

    </ContainerBlock>
  )
}

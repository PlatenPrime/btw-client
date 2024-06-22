import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, TextBlock } from '../../../components'
import { AddIcon, EditIcon } from '../../../components/UI/Icons';
import AdaptTestQuestionForm from './AdaptTestQuestionForm';
import useTestsStore from '../stores/adaptTestsStore';





export default function AdaptTestEditContainer({
  test
}) {




  const { updateTestById } = useTestsStore();

  const [newTest, setNewTest] = useState(() => test);
  const [isNewQuestionAdding, setIsNewQuestionAdding] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);




  const handleSaveQuestion = (question) => {
    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = newTest.questions.map((q) =>
        q._id === question._id ? question : q
      );
    } else {
      updatedQuestions = [...newTest.questions, { ...question, _id: new Date().getTime() }];
    }
    const updatedTest = { ...newTest, questions: updatedQuestions };
    setNewTest(updatedTest);
    setIsNewQuestionAdding(false);
    setEditingQuestion(null);
    updateTestById(test._id, updatedTest); // Update the test in the store
  };




  return (
    <ContainerBlock
      className="flex flex-col items-center"

    >


      {newTest.questions.map((question) => (
        <CardBlock className="flex " key={question._id}>
          <TextBlock>{question.questionText}</TextBlock>
          <ButtonBlock className="blue-b" onClick={() => setEditingQuestion(question)}><EditIcon /></ButtonBlock>
        </CardBlock>
      ))}



{isNewQuestionAdding && (
        <AdaptTestQuestionForm onSave={handleSaveQuestion} />
      )}

      {editingQuestion && (
        <AdaptTestQuestionForm question={editingQuestion} onSave={handleSaveQuestion} />
      )}




      <ButtonBlock
        className="lime-b-n  text-xl"
      >
        <AddIcon />
      </ButtonBlock>

    </ContainerBlock>
  )
}

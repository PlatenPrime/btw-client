import React, { useState } from 'react';
import { ButtonBlock, CardBlock, InputBlock } from '../../../components';

const QuestionForm = ({ question = {}, onSave }) => {
    const [questionText, setQuestionText] = useState(question.questionText || '');
    const [options, setOptions] = useState(question.options || ['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(question.correctOption || 0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSave = () => {
        onSave({ ...question, questionText, options, correctOption });
    };

    return (
        <CardBlock>
            <InputBlock
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Question Text"
            />
            {options.map((option, index) => (
                <CardBlock key={index}>
                   {index + 1} <InputBlock
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Варіант ${index + 1}`}
                    />
                </CardBlock>
            ))}
            <select 
            className="InputBlock w-full"
            defaultValue={correctOption}
            value={correctOption} 
            onChange={(e) => setCorrectOption(parseInt(e.target.value, 10))}>
                {options.map((_, index) => (
                    <option key={index} value={index}>
                        {`Варіант ${index + 1}`}
                    </option>
                ))}
            </select>
            <ButtonBlock className="green-b-n"  onClick={handleSave}>Зберегти</ButtonBlock>
        </CardBlock>
    );
};

export default QuestionForm;

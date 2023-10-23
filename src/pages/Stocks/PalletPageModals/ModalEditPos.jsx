import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock } from '../../../components';

function ModalEditPos({
    show,
    selectedPos,
    newPosQuantValue,
	setNewPosQuantValue,
    newPosBoxesValue,
	setNewPosBoxesValue,
    newPosDateValue,
	setNewPosDateValue,
    handleUpdatePosById,
    onCancel,
}) {
    return (
        show && (
            <ModalWrapper title={`Редагування позиції ${selectedPos.artikul}`} onCancel={onCancel}>
                <CardBlock className="space-y-4">
                    <CardBlock className="flex justify-between space-x-2">
                        <TextBlock>Кількість:</TextBlock>
                        <InputBlock
                            name="newPosQuantValue"
                            value={newPosQuantValue}
                            onChange={(e) => { setNewPosQuantValue(e.target.value) }}
                        />
                    </CardBlock>
                    <CardBlock className="flex justify-between space-x-2">
                        <TextBlock>Коробки:</TextBlock>
                        <InputBlock
                            name="newPosBoxesValue"
                            value={newPosBoxesValue}
                            onChange={(e) => { setNewPosBoxesValue(e.target.value) }}
                        />
                    </CardBlock>
                    <CardBlock className="flex justify-between space-x-2">
                        <TextBlock>Дата:</TextBlock>
                        <InputBlock
                            name="newPosDataValue"
                            value={newPosDateValue}
                            placeholder="12-2000..."
                            onChange={(e) => { setNewPosDateValue(e.target.value) }}
                        />
                    </CardBlock>
                    <CardBlock className="flex justify-between">
                        <ButtonBlock
                            className="cancel-c"
                            onClick={() => { onCancel(); }}
                        >
                            Скасувати
                        </ButtonBlock>
                        <ButtonBlock
                            className="success-c"
                            onClick={() => { handleUpdatePosById(selectedPos._id); }}
                        >
                            Підтвердити
                        </ButtonBlock>
                    </CardBlock>
                </CardBlock>
            </ModalWrapper>
        )
    );
}

export default ModalEditPos;

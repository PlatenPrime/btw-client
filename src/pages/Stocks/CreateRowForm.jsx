import React, { useState } from 'react';
import { useRowStore } from './stocksStore';
import { ButtonBlock, CardBlock, InputBlock, TextBlock } from '../../components';
import Spinner from '../../components/Spinner/Spinner';

function CreateRowForm() {
	const createRow = useRowStore((state) => state.createRow);
	const [newRowTitle, setNewRowTitle] = useState('');
	const [isCreatingRow, setIsCreatingRow] = useState(false)

	const handleCreateRow = async () => {
		try {
			setIsCreatingRow(true)
			await createRow(newRowTitle);
			setNewRowTitle(''); // Очистить поле после создания Row

		} catch (error) {
			console.error('Ошибка при создании Row:', error);
		} finally {
			setIsCreatingRow(false)
		}
	};

	return (
		<CardBlock
			className="border bg-cyan-500/10 border-cyan-500 p-2 flex justify-center"
		>
			<InputBlock
				type="text"
				placeholder="Название нового ряда"
				value={newRowTitle}
				onChange={(e) => setNewRowTitle(e.target.value)}
			/>
			<ButtonBlock
				onClick={handleCreateRow}
				className="create-c flex items-center justify-center "
			>
				<TextBlock>Создать новый ряд</TextBlock> {isCreatingRow && <Spinner />}
			</ButtonBlock>
			
		</CardBlock>
	);
}

export default CreateRowForm;

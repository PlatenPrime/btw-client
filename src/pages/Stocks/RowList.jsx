import React, { useEffect } from 'react';
import { useRowStore } from './stocksStore';
import { CardBlock, TextBlock } from '../../components';
import RowBage from '../Row/Row/RowBage';


export function RowList() {
	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);

	useEffect(() => {
		// При монтировании компонента получите все Row
		getAllRows();
	}, []);


	console.log(rows)
	return (
		<CardBlock
			className="p-2 space-y-2 bg-orange-500/5"
		>
			<TextBlock
			className="text-3xl"
			>Ряды
			</TextBlock>

			{rows.map((row) => (
				<RowBage row={row} key={row._id} />
			))}

		</CardBlock>
	);
}



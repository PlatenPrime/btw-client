import React, { useEffect, useState } from 'react';
import { useRowStore } from './stocksStore';
import { CardBlock, TextBlock } from '../../components';
import RowBage from '../Row/Row/RowBage';
import Spinner from '../../components/Spinner/Spinner';


export function RowList() {
	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);
	const [isRowLoading, setIsRowLoading] = useState(false)


	async function fetchRows() {
		try {
			setIsRowLoading(true)
			await getAllRows();
		} catch (error) {
			console.log(error)
		} finally {
			setIsRowLoading(false)
		}
	}



	useEffect(() => {
		// При монтировании компонента получите все Row
		fetchRows()
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

			{isRowLoading ? <Spinner color="rgb(249 115 22)" /> :
				<CardBlock
					className="space-y-2"
				>
					{rows.map((row) => (
						<RowBage row={row} key={row._id} />
					))}
				</CardBlock>




			}

		</CardBlock>
	);
}



import React, { useEffect, useState } from 'react';
import { useRowStore } from './stores/rowsStore';
import { CardBlock, TextBlock, Spinner } from '../../components';
import RowBage from './RowBage';



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


	return (
		<CardBlock
			className="p-2 space-y-2 bg-orange-500/5"
		>
			<TextBlock
				className="text-3xl"
			>Ряди
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



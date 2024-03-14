import React, { useEffect, useState } from 'react';
import { useRowStore } from './stores/rowsStore';
import { CardBlock, TextBlock, Spinner, ContainerBlock } from '../../components';
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
			className="p-2 space-y-2 "
		>


			{isRowLoading ?


				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(249 115 22)" />
				</ContainerBlock>

				:
				<CardBlock
					className="space-y-4"
				>
					{rows.map((row) => (
						<RowBage row={row} key={row._id} />
					))}
				</CardBlock>




			}

		</CardBlock>
	);
}



import React, { useEffect } from 'react';
import { useRowStore } from './rowStore';


function RowList() {
	const { rows, setRows, getRows } = useRowStore((state) => ({
		rows: state.rows,
		setRows: state.setRows,
		getRows: state.getRows,

	}));


	useEffect(() => {
		getRows();
	}, []); // Empty dependency array to run it once on mount

	console.log(rows)


	return (
		<div>
			<h1>List of Rows</h1>
			{/* <ul>
				{rows?.map((row) => (
					<li key={row._id}>
						{row.title}

					</li>
				))}
			</ul> */}
		</div>
	);
}

export default RowList;

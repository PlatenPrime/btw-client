import React, { useEffect, useState } from 'react';
import { useRowStore } from './stores/rowsStore';
import { CardBlock, TextBlock, Spinner, ContainerBlock } from '../../components';
import RowBage from './RowBage';



export function RowList() {
	const rows = useRowStore((state) => state.rows);
	
	return (
		
				<CardBlock
					className="space-y-4"
				>
					{rows?.map((row) => (
						<RowBage row={row} key={row._id} />
					))}
				</CardBlock>

	);
}



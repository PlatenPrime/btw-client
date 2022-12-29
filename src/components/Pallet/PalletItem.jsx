import React, { useState } from 'react';
import PalletPositionAdd from './PalletPositionAdd';
import PalletPositions from './PalletPositions';
import PalletTitle from './PalletTitle';





const PalletItem = ({

	isPalletEditing,
	title,
	setTitle,
	positions,
	setPositions

}) => {








	return (
		<div>

			<PalletTitle
				isPalletEditing={isPalletEditing}
				title={title}
				setTitle={setTitle}

			/>


			{isPalletEditing && <div className=''>

				<PalletPositionAdd
					isPalletEditing={isPalletEditing}
					positions={positions}
					setPositions={setPositions}

				/>


			</div>}


			<PalletPositions
				isPalletEditing={isPalletEditing}
				positions={positions}
				setPositions={setPositions}


			/>






		</div>
	);
};

export default PalletItem;
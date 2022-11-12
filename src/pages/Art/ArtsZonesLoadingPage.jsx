import React, { useState } from 'react';

const ArtsZonesLoadingPage = () => {

	const [artZones, setArtZones] = useState([]);


	

	

	return (
		<div>

			<h1>Здесь будут загружаться зоны</h1>

			<textarea
				className='my-40'
				type="textarea"
				onChange={(e) => setArtZones(JSON.parse(e.target.value))}


			/>
			<div className='bg-green-400 mt-10'>
				<button>Обновить зоны артикулов</button>
			</div>

// test output

			{artZones.map((art) => <div>
				<p>ART: {art.art}</p>
				<p>NAME: {art.name}</p>
				<p>ZONE: {art.zone}</p>
			</div>)}

		</div>
	);
};

export default ArtsZonesLoadingPage;
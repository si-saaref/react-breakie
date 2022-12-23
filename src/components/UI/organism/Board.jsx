import { useState } from 'react';

export default function Board({ grid }) {
	const [gridLayout, setGridLayout] = useState(grid);
	return (
		<>
			<div className='container-fluid'>
				{/* <h2 id='score'>{currentScore}</h2> */}
				<h1>AYAM</h1>
			</div>
		</>
	);
}

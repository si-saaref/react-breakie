import { useState } from 'react';
import GridBoard from '../../molecules/GridBoard';
import './style.css';

export default function Board({ grid }) {
	const [gridLayout, setGridLayout] = useState(grid);
	return (
		<>
			<div className='container-fluid'>
				{/* <h2 id='score'>{currentScore}</h2> */}
				<h1>Breakie</h1>
				<GridBoard grid={gridLayout} />
			</div>
		</>
	);
}

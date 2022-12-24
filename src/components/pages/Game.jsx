import { useState } from 'react';
import { gridLayout as grid } from '../../utils/utils';
import Background from '../UI/organism/Background';
import Board from '../UI/organism/Board';

export default function Game() {
	// ! THIS WILL DEEP CLONE THE NESTER ARRAY, so the main grid layout can be reused to reset the game
	const [gridLayout] = useState(JSON.parse(JSON.stringify(grid)));

	return (
		<>
			<div className='game-container'>
				<Board grid={gridLayout} />
			</div>
			<Background />
		</>
	);
}

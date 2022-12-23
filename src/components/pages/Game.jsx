import { useState } from 'react';
import { gridLayout } from '../../utils/utils';
import Board from '../UI/organism/Board';

export default function Game() {
	return (
		<>
			<Board grid={gridLayout} />
		</>
	);
}

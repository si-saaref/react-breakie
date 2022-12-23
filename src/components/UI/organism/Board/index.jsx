import { useState } from 'react';
import Button from '../../atoms/Button';
import GridBoard from '../../molecules/GridBoard';
import './style.css';

export default function Board({ grid }) {
	const [gridLayout, setGridLayout] = useState(grid);

	const goingRight = () => {
		// console.log(appState)
		let newGridState = [...gridLayout];
		newGridState.forEach((parentItem, idx) => {
			if (parentItem.includes(4)) {
				const charItem = parentItem.indexOf(4);
				if (
					parentItem[charItem + 1] === 1 ||
					parentItem[charItem + 1] === 3 ||
					parentItem[charItem + 1] === 2
				) {
					if (parentItem[charItem + 1] === 3) {
						alert('YOU WIN');
					}
					// if (parentItem[charItem + 1] === 2) {
					// 	setCurrentScore((prevValue) => prevValue + 30);
					// } else {
					// 	setCurrentScore(currentScore - 10);
					// }
					parentItem.splice(charItem + 1, 1, 4);
					parentItem.splice(charItem, 1, 1);
				} else {
					alert("YOU CAN'T GO THROUGH BLOCKING WAY");
				}
				// console.log(parentItem)
			}
		});
		setGridLayout(newGridState);
	};

	const goingLeft = () => {
		// console.log(appState)
		let newGridState = [...gridLayout];
		newGridState.forEach((parentItem) => {
			if (parentItem.includes(4)) {
				const charItem = parentItem.indexOf(4);
				if (
					parentItem[charItem - 1] === 1 ||
					parentItem[charItem - 1] === 3 ||
					parentItem[charItem - 1] === 2
				) {
					if (parentItem[charItem - 1] === 3) {
						alert('YOU WIN');
					}
					// if (parentItem[charItem - 1] === 2) {
					// 	setCurrentScore((prevValue) => prevValue + 30);
					// } else {
					// 	setCurrentScore(currentScore - 10);
					// }
					parentItem.splice(charItem - 1, 1, 4);
					parentItem.splice(charItem, 1, 1);
				} else {
					alert("YOU CAN'T GO THROUGH BLOCKING WAY");
				}
				// console.log(parentItem)
			}
		});
		setGridLayout(newGridState);
	};

	return (
		<>
			<div className='container-fluid'>
				{/* <h2 id='score'>{currentScore}</h2> */}
				<h1>Breakie</h1>
				<GridBoard grid={gridLayout} />
				<div className='button-wrapper'>
					<Button>Up</Button>
					<Button onClick={goingRight}>Right</Button>
					<Button onClick={goingLeft}>Left</Button>
					<Button>Down</Button>
				</div>
			</div>
		</>
	);
}

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

	const goingUp = () => {
		// console.log(appState)
		let newGridState = [...gridLayout];
		newGridState.forEach((parentItem, idx) => {
			if (parentItem.includes(4)) {
				const charParentItem = newGridState.indexOf(parentItem);
				const charChildItem = parentItem.indexOf(4);

				if (
					newGridState[idx - 1][charChildItem] === 1 ||
					newGridState[idx - 1][charChildItem] === 3 ||
					newGridState[idx - 1][charChildItem] === 2
				) {
					// console.log('WPO',charParentItem, charChildItem)
					if (newGridState[idx - 1][charChildItem] === 3) {
						alert('YOU WIN');
					}
					// if (newGridState[idx - 1][charChildItem] === 2) {
					// 	setCurrentScore((prevValue) => prevValue + 30);
					// } else {
					// 	setCurrentScore(currentScore - 10);
					// }
					let newGridRow = [...newGridState[charParentItem - 1]];
					newGridRow.splice(charChildItem, 1, 4);
					newGridState.splice(charParentItem - 1, 1, newGridRow);
					parentItem.splice(charChildItem, 1, 1);

					// console.log(newGridState, newGridRow)
				} else {
					alert("YOU CAN'T GO THROUGH BLOCKING WAY");
				}
			}
		});
		setGridLayout(newGridState);
	};

	const goingDown = () => {
		// console.log(appState)
		let newGridState = [...gridLayout];
		// let deepCloneState = JSON.parse(JSON.stringify(appState));
		// console.log(newGridState);
		// ! FIX BISA => MASIH MASUK LOGIC
		const prevItem = newGridState.find((item) => {
			return item.includes(4);
		});
		const idxParent = newGridState.indexOf(prevItem);
		const idxChar = prevItem.indexOf(4);
		let newGridRow = newGridState[idxParent + 1];
		if (idxParent < newGridState.length && newGridState[idxParent + 1] !== undefined) {
			if (
				newGridState[idxParent + 1][idxChar] === 1 ||
				newGridState[idxParent + 1][idxChar] === 3 ||
				newGridState[idxParent + 1][idxChar] === 2
			) {
				if (newGridState[idxParent + 1][idxChar] === 3) {
					alert('YOU WIN');
				}
				// if (newGridState[idxParent + 1][idxChar] === 2) {
				// 	setCurrentScore((prevValue) => prevValue + 30);
				// } else {
				// 	setCurrentScore(currentScore - 10);
				// }
				prevItem.splice(idxChar, 1, 1);
				newGridRow.splice(idxChar, 1, 4);
				console.log(prevItem, idxParent, idxChar, newGridState);
			} else {
				alert('YEU GEBLEK');
			}
		} else {
			alert('YEU GEBLEK');
		}
		setGridLayout(newGridState);
	};

	return (
		<>
			<div className='container-fluid'>
				{/* <h2 id='score'>{currentScore}</h2> */}
				<h1>Breakie</h1>
				<GridBoard grid={gridLayout} />
				<div className='button-wrapper'>
					<Button onClick={goingUp}>Up</Button>
					<div className=''>
						<Button onClick={goingLeft}>Left</Button>
						<Button onClick={goingDown}>Down</Button>
						<Button onClick={goingRight}>Right</Button>
					</div>
				</div>
			</div>
		</>
	);
}

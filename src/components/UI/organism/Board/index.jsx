import { useEffect, useState } from 'react';
import Button from '../../atoms/Button';
import GridBoard from '../../molecules/GridBoard';
import './style.css';
import { gridLayout as mainGrid } from '../../../../utils/utils';
import { toast, Toaster } from 'react-hot-toast';

export default function Board({ grid }) {
	const [gridLayout, setGridLayout] = useState([...grid]);
	const [currentScore, setCurrentScore] = useState(1000);

	useEffect(() => {
		document.addEventListener('keydown', function (e) {
			const { key } = e;
			checkKeyPress(key.toLowerCase());
			console.log(e);
		});
	}, []);

	// useEffect(() => {
	// 	console.log('DEAGAIGJAISJ ', gridLayout);
	// }, [gridLayout]);

	const checkKeyPress = (key) => {
		if (key === 'arrowright') {
			goingRight();
		}
		if (key === 'arrowleft') {
			goingLeft();
		}
		if (key === 'arrowdown') {
			goingDown();
		}
		if (key === 'arrowup') {
			goingUp();
		}
	};

	const goingRight = () => {
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
						toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
					}
					if (parentItem[charItem + 1] === 2) {
						setCurrentScore((prevValue) => prevValue + 30);
					} else {
						setCurrentScore(currentScore - 10);
					}
					parentItem.splice(charItem + 1, 1, 4);
					parentItem.splice(charItem, 1, 1);
				} else {
					toast.error("You Can't go through that way bruh !!!!", {
						duration: 1000,
						position: 'top-right',
					});
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
						toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
					}
					if (parentItem[charItem - 1] === 2) {
						setCurrentScore((prevValue) => prevValue + 30);
					} else {
						setCurrentScore(currentScore - 10);
					}
					parentItem.splice(charItem - 1, 1, 4);
					parentItem.splice(charItem, 1, 1);
				} else {
					toast.error("You Can't go through that way bruh !!!!", {
						duration: 1000,
						position: 'top-right',
					});
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
						toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
					}
					if (newGridState[idx - 1][charChildItem] === 2) {
						setCurrentScore((prevValue) => prevValue + 30);
					} else {
						setCurrentScore(currentScore - 10);
					}
					let newGridRow = newGridState[charParentItem - 1];
					newGridRow.splice(charChildItem, 1, 4);
					newGridState.splice(charParentItem - 1, 1, newGridRow);
					console.log('new grid row =>', newGridRow);
					parentItem.splice(charChildItem, 1, 1);

					// console.log(newGridState, newGridRow)
				} else {
					toast.error("You Can't go through that way bruh !!!!", {
						duration: 1000,
						position: 'top-right',
					});
				}
			}
		});
		console.log('GOING UP >', newGridState);
		setGridLayout(newGridState);
	};

	const goingDown = () => {
		// console.log(appState)
		let newGridState = [...gridLayout];
		// let deepCloneState = JSON.parse(JSON.stringify(appState));
		// console.log(newGridState);
		// ! FIX BISA => MASIH MASUK LOGIC
		console.log('NEW GRID DOWN =>', newGridState);
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
					toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
				}
				if (newGridState[idxParent + 1][idxChar] === 2) {
					setCurrentScore((prevValue) => prevValue + 30);
				} else {
					setCurrentScore(currentScore - 10);
				}
				prevItem.splice(idxChar, 1, 1);
				newGridRow.splice(idxChar, 1, 4);
				console.log(prevItem, idxParent, idxChar, newGridState);
			} else {
				toast.error("You Can't go through that way bruh !!!!", {
					duration: 1000,
					position: 'top-right',
				});
			}
		} else {
			toast.error("You Can't go through that way bruh !!!!", {
				duration: 1000,
				position: 'top-right',
			});
		}
		setGridLayout(newGridState);
	};

	const resetGame = () => {
		setGridLayout(mainGrid);
		setCurrentScore(1000);
	};

	return (
		<>
			<div className='container-fluid'>
				<h1>Breakie</h1>
				<div className='info-wrapper'>
					<div className=''>
						<h3>Score : </h3>
						<h3 id='score'>{currentScore}</h3>
					</div>
					<button className='button' onClick={resetGame}>
						<span className='btn-reset'>Reset</span>
					</button>
				</div>
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

// const goingUp = () => {
// 	// console.log(appState)
// 	let newGridState = [...gridLayout];
// 	// newGridState.forEach((parentItem, idx) => {
// 	// 	if (parentItem.includes(4)) {
// 	// 		const charParentItem = newGridState.indexOf(parentItem);
// 	// 		const charChildItem = parentItem.indexOf(4);

// 	// 	}
// 	// });
// 	const prevItem = newGridState.find((item) => item.includes(4));

// 	const idxParent = newGridState.indexOf(prevItem);
// 	const idxChar = prevItem.indexOf(4);

// 	// ! if we wrap or deep clone newGridRow with [...arr] => the items cannot be direct access
// 	let newGridRow = newGridState[idxParent - 1];
// 	if (idxParent < newGridState.length && newGridRow !== undefined) {
// 		if (
// 			newGridState[idxParent - 1][idxChar] === 1 ||
// 			newGridState[idxParent - 1][idxChar] === 3 ||
// 			newGridState[idxParent - 1][idxChar] === 2
// 		) {
// 			// console.log('WPO',charParentItem, idxChar)
// 			if (newGridState[idxParent - 1][idxChar] === 3) {
// 				toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
// 			}
// 			if (newGridState[idxParent - 1][idxChar] === 2) {
// 				setCurrentScore((prevValue) => prevValue + 30);
// 			} else {
// 				setCurrentScore(currentScore - 10);
// 			}
// 			// let newGridRow = [...newGridState[charParentItem - 1]];
// 			prevItem.splice(idxChar, 1, 1);
// 			newGridRow.splice(idxChar, 1, 4);
// 			// newGridState.splice(charParentItem - 1, 1, newGridRow);
// 			console.log('new grid row =>', newGridRow);

// 			// console.log(newGridState, newGridRow)
// 		} else {
// 			toast.error("You Can't go through that way bruh !!!!", {
// 				duration: 1000,
// 				position: 'top-right',
// 			});
// 		}
// 	} else {
// 		toast.error("You Can't go through that way bruh !!!!", {
// 			duration: 1000,
// 			position: 'top-right',
// 		});
// 	}

// 	console.log('GOING UP >', newGridState);
// 	setGridLayout(newGridState);
// };

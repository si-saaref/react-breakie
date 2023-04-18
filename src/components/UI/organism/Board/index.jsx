import { createRef, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { gridLayout as mainGrid } from '../../../../utils/utils';
import Button from '../../atoms/Button';
import GridBoard from '../../molecules/GridBoard';
import './style.css';

export default function Board({ grid }) {
	const [gridLayout, setGridLayout] = useState([...grid]);
	const [currentScore, setCurrentScore] = useState(1000);
	const [winner, setWinner] = useState(null);
	const btnRight = useRef();
	const btnLeft = useRef();
	const btnUp = useRef();
	const btnDown = useRef();

	useEffect(() => {
		document.addEventListener('keydown', function (e) {
			const { key } = e;
			checkKeyPress(key.toLowerCase());
		});
	}, []);

	const checkKeyPress = (key) => {
		if (key === 'arrowright') {
			// goingRight();
			btnRight.current.click();
		}
		if (key === 'arrowleft') {
			btnLeft.current.click();
			// goingLeft();
		}
		if (key === 'arrowdown') {
			btnDown.current.click();
			// goingDown();
		}
		if (key === 'arrowup') {
			btnUp.current.click();
			// goingUp();
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
						setWinner('P1');
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
			}
		});
		setGridLayout(newGridState);
	};

	const goingLeft = () => {
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
						setWinner('P1');
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
			}
		});
		setGridLayout(newGridState);
	};

	const goingUp = () => {
		let newGridState = [...gridLayout];
		newGridState.forEach((parentItem, idx) => {
			if (parentItem.includes(4)) {
				const charParentItem = newGridState.indexOf(parentItem);
				const charChildItem = parentItem.indexOf(4);
				if (idx === 0) {
					toast.error("You Can't go through that way bruh !!!!", {
						duration: 1000,
						position: 'top-right',
					});
					return;
				}
				if (
					newGridState[idx - 1][charChildItem] === 1 ||
					newGridState[idx - 1][charChildItem] === 3 ||
					newGridState[idx - 1][charChildItem] === 2
				) {
					if (newGridState[idx - 1][charChildItem] === 3) {
						toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
						setWinner('P1');
					}
					if (newGridState[idx - 1][charChildItem] === 2) {
						setCurrentScore((prevValue) => prevValue + 30);
					} else {
						setCurrentScore(currentScore - 10);
					}
					let newGridRow = newGridState[charParentItem - 1];
					newGridRow.splice(charChildItem, 1, 4);
					newGridState.splice(charParentItem - 1, 1, newGridRow);
					parentItem.splice(charChildItem, 1, 1);
				} else {
					toast.error("You Can't go through that way bruh !!!!", {
						duration: 1000,
						position: 'top-right',
					});
				}
			}
		});
		setGridLayout(newGridState);
	};

	const goingDown = () => {
		let newGridState = [...gridLayout];
		// let deepCloneState = JSON.parse(JSON.stringify(appState));
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
					toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
					setWinner('P1');
				}
				if (newGridState[idxParent + 1][idxChar] === 2) {
					setCurrentScore((prevValue) => prevValue + 30);
				} else {
					setCurrentScore(currentScore - 10);
				}
				prevItem.splice(idxChar, 1, 1);
				newGridRow.splice(idxChar, 1, 4);
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
		window.location.reload();
		setGridLayout(mainGrid);
		setCurrentScore(1000);
		setWinner(null);
	};

	return (
		<>
			<div className='container-fluid'>
				<h1>React Breakieee</h1>
				<div className='info-wrapper'>
					<div className=''>
						<h4>Score : </h4>
						<h4 id='score'>{currentScore}</h4>
					</div>
					<button className='button' onClick={resetGame}>
						<span className='btn-reset'>Reset</span>
					</button>
				</div>
				<GridBoard grid={gridLayout} />
				<div className='button-wrapper'>
					<Button onClick={goingUp} reference={btnUp} disabled={winner ? true : false}>
						Up
					</Button>
					<div className=''>
						<Button onClick={goingLeft} reference={btnLeft} disabled={winner ? true : false}>
							Left
						</Button>
						<Button onClick={goingDown} reference={btnDown} disabled={winner ? true : false}>
							Down
						</Button>
						<Button onClick={goingRight} reference={btnRight} disabled={winner ? true : false}>
							Right
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

// const goingUp = () => {
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
// 			if (newGridState[idxParent - 1][idxChar] === 3) {
// 				toast.success('You WINNNNNN !!!!', { duration: 1000, position: 'top-right' });
// setWinner('P1');
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

// 	setGridLayout(newGridState);
// };

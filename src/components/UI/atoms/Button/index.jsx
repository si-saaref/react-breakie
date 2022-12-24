import { useState } from 'react';
import {
	AiOutlineArrowDown as ArrowDown,
	AiOutlineArrowLeft as ArrowLeft,
	AiOutlineArrowRight as ArrowRight,
	AiOutlineArrowUp as ArrowUp,
} from 'react-icons/ai';
import './style.css';

export default function Button({ children, onClick, onKeyDown, reference }) {
	const [icon] = useState(children.toLowerCase());

	return (
		<>
			{/* <Button>{children}</Button> */}
			<button className='button' onClick={onClick} onKeyDown={onKeyDown} ref={reference}>
				<span className='button_top'>
					{icon === 'left' ? (
						<ArrowLeft />
					) : icon === 'right' ? (
						<ArrowRight />
					) : icon === 'up' ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</span>
			</button>
			{/* <div className='scene'>
				<div className='cube'>
					<button className='button btn-primary' onClick={onClick}>
						{children}
					</button>
				</div>
			</div> */}
		</>
	);
}

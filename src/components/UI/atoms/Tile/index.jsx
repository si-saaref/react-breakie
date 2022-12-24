import './style.css';

export default function Tile({ type, id }) {
	if (type === 0) {
		return (
			<td id={id} className='tile block'>
				&nbsp;
			</td>
		);
	}
	if (type === 1) {
		return (
			<td id={id} className='tile path'>
				&nbsp;
			</td>
		);
	}
	if (type === 2) {
		return (
			<td id={id} className='tile bonus'>
				&nbsp;
			</td>
		);
	}
	if (type === 3) {
		return (
			<td id={id} className='tile finish'>
				&nbsp;
			</td>
		);
	}

	return (
		<td id={id} className='tile character'>
			&nbsp;
		</td>
	);
}

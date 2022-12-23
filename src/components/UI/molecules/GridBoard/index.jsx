import Tile from '../../atoms/Tile';

export default function GridBoard({ grid }) {
	return (
		<>
			<table>
				<tbody>
					{grid.map((rowVal, row) => (
						<tr key={`r-${row}`}>
							{rowVal.map((colVal, col) => {
								return <Tile id={`item-${row}-${col}`} type={colVal} key={`el-${row}${col}`} />;
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

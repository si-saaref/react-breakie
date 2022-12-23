export default function Button({ children, onClick }) {
	return (
		<>
			{/* <Button>{children}</Button> */}
			<button onClick={onClick}>{children}</button>
		</>
	);
}

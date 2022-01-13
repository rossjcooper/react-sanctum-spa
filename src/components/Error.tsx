export interface ErrorProps {
	error: string|undefined,
}

const Error = (props: ErrorProps) => {

	if (!props.error) {
		return null;
	}

	return (
		<span className="text-red-500 block p-2">{props.error}</span>
	);
}

export default Error;
export interface ErrorProps {
	error: string|undefined|string[],
}

const Error = (props: ErrorProps) => {

	if (!props.error) {
		return null;
	}

	let error = '';
	if (typeof props.error === 'string') {
		error = props.error;
	}
	if (props.error instanceof Array) {
		error = props.error[0];
	}

	return (
		<span className="text-red-500 block p-2">{error}</span>
	);
}

export default Error;
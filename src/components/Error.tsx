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
        [error] = props.error;
    }

    return (
        <span className="text-red-500 block px-1 py-2 font-light text-xs">{error}</span>
    );
};

export default Error;

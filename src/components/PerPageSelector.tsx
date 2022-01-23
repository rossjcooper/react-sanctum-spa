import { ChangeEvent } from 'react';

interface PerPageSelectorProps {
	perPage: number,
	onChange: (perPage: number) => any,
	options?: number[],
}

const defaultOptions = [
    25,
    50,
    100,
    200,
];
export const PerPageSelector = (props: PerPageSelectorProps) => {
    const options = props.options || defaultOptions;

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        props.onChange(parseInt(event.target.value));
    };

    return (
        <div>
            <select name="perPage" id="perPage" aria-label="Items per page" className="input-control" value={props.perPage} onChange={handleOnChange}>
                {options.map((p) => (
                    <option key={`perPage_${p}`} value={p}>
                        {p}
                        {' '}
                        per page
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PerPageSelector;

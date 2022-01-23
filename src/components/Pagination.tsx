import { ChangeEvent } from 'react';

interface PaginationProps {
    page: number,
    lastPage: number,
    onChange: (page: number) => any,
}

export const Pagination = (props: PaginationProps) => {
    const options = [];
    for (let i = 1; i <= props.lastPage; ++i) {
        options.push(i);
    }

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        props.onChange(parseInt(event.target.value, 10));
    };

    return (
        <div className="my-4">
            <select name="page" value={props.page} className="input-control" onChange={handleOnChange}>
                {options.map((o) => (
                    <option value={o}>
                        { `Page ${o}` }
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pagination;

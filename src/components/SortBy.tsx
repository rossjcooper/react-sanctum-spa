import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

export enum SortByDirections {
    ASC = 'asc',
    DESC = 'desc',
}

export interface SortByValue {
    name: string,
    direction: SortByDirections,
}

interface SortByProps {
    name: string,
    label: string,
    value: SortByValue,
    onChange: (value: SortByValue) => any,
}

const SortBy = (props: SortByProps) => {
    const isCurrent = props.name === props.value.name;

    const handleOnClick = () => {
        let direction = props.value.direction === SortByDirections.ASC ? SortByDirections.DESC : SortByDirections.ASC;
        if (isCurrent) {
            direction = SortByDirections.ASC;
        }

        props.onChange({
            name: props.name,
            direction,
        });
    };

    return (
        <button type="button" className="sort-by hover:opacity-75" onClick={handleOnClick}>
            <span className={isCurrent ? 'underlined text-primary' : ''}>{props.label}</span>
            {!isCurrent ? (<AiOutlineArrowDown className="direction align-text-bottom" />) : null}
            {isCurrent && props.value.direction === SortByDirections.ASC ? (<AiOutlineArrowUp className="inline-block ml-1 text-primary align-text-bottom" />) : null}
            {isCurrent && props.value.direction === SortByDirections.DESC ? (<AiOutlineArrowDown className="inline-block ml-1 text-primary align-text-bottom" />) : null}
        </button>
    );
};

export default SortBy;

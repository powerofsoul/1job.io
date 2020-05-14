import React from "react"
import EditableInput from "./EditableInput"

interface Props {
    array: string[];
    onChange: (values: string[]) => void;
}

export default (props: Props) => {

    return <span>
        {props.array.map((e, i) => <EditableInput value={e} onChange={(value: string) => props.onChange([
            ...props.array.slice(0, i),
            value,
            ...props.array.slice(i+1)
        ]) }/>)}
    </span>
}
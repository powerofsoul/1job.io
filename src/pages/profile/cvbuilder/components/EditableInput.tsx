import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Input, InputNumber } from "antd";
import colors from "../../../../style/Colors";

interface Props {
    value: string | number;
    placeHolder?: string;
    onChange: (value) => void
    disabled?: boolean
    isNumber?: boolean,
    minHeight?: string;
}

const EditableInput = styled.span`
    input {
        box-shadow : none;  
        outline: none;
        border: 0;
        display: inline
    }

    .placeholder {
        color: ${colors.yellow};
    }
`;

export default (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const CurrentInput = props.isNumber ? InputNumber : Input.TextArea;

    return <EditableInput>
        {!isEditing && <span onClick={() => !props.disabled && setIsEditing(true)}>
            {props.value
                ? props.value :
                <span className="placeholder">{props.placeHolder}</span>}
        </span>}
        {isEditing && <CurrentInput style={{minHeight: props.minHeight}} autoFocus placeholder={props.placeHolder} defaultValue={props.value as any} onBlur={(e) => {
            props.onChange(e.target.value);
            setIsEditing(false);
        }} />}
    </EditableInput>
}
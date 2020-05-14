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
    style?: "nostyle" | "textarea"
}

const EditableInput = styled.span`
    .value {
        white-space: break-spaces;
    }
    .ant-input {
        box-shadow : none;  
        outline: none;
        border: 0;
   
        background-color: transparent;
        padding: 0;
        width: 80%;
    }

    .placeholder {
        color: ${colors.yellow};
    }
`;

export default (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const CurrentInput = props.isNumber ? InputNumber : (props.style == "nostyle" ? Input : Input.TextArea);

    return <EditableInput>
        {!isEditing && <span className="value" onClick={() => !props.disabled && setIsEditing(true)}>
            {props.value
                ? props.value :
                props.placeHolder}
        </span>}
        {isEditing && <CurrentInput autoSize autoFocus placeholder={props.placeHolder} defaultValue={props.value as any} onBlur={(e) => {
            props.onChange(e.target.value);
            setIsEditing(false);
        }} />}
    </EditableInput>
}
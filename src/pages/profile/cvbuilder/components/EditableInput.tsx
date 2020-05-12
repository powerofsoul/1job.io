import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "antd";
import colors from "../../../../style/Colors";

interface Props {
    value: string;
    placeHolder: string;
    onChange: (value) => void
    disabled?: boolean
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

    return <EditableInput>
        {!isEditing && <span onClick={() => !props.disabled && setIsEditing(true)}>
            {props.value && props.value?.trim().length > 0
                ? props.value :
                <span className="placeholder">{props.placeHolder}</span>}
        </span>}
        {isEditing && <Input.TextArea autoFocus placeholder={props.placeHolder} defaultValue={props.value} onBlur={(e) => {
            props.onChange(e.target.value);
            setIsEditing(false);
        }} />}
    </EditableInput>
}
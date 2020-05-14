import styled from "styled-components";
import React, { useState } from "react";
import Space from "../../../../style/Space";
import colors from "../../../../style/Colors";
import { MinusCircleTwoTone } from "@ant-design/icons";

const Component = styled.div`
    margin-bottom: ${Space.md};
    position:relative;

    .period {
        display: flex;
    }

    .delete-icon {
        position: absolute;
        left: -30px;
        top: 50%;

        cursor: pointer;
        z-index: 20;
    }

    .deleting-overlay {
        background-color: ${colors.red};
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.2;
    }
`;

interface Props {
    onDelete: () => void;
    className?: string;
    children: any;
}

export default (props: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    return <Component className={props.className}>
        {props.children}

        <div className="deleting-overlay" style={{display: isDeleting ? "unset" : "none"}}/>
        <MinusCircleTwoTone className="delete-icon" 
            twoToneColor={colors.red} 
            onClick={() => props.onDelete()} 
            onMouseEnter={() => setIsDeleting(true)}
            onMouseLeave={() => setIsDeleting(false)}
        />
    </Component>
}
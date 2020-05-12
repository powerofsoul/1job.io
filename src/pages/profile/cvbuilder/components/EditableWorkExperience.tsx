import React, { useState } from "react";
import { WorkExperience } from "../../../../../models/Employee";
import EditableInput from "./EditableInput";
import styled from "styled-components";
import Space from "../../../../style/Space";
import EditableRangeDatePicker from "./EditableRangeDatePicker";
import { MinusCircleTwoTone } from "@ant-design/icons";
import colors from "../../../../style/Colors";

interface Props {
    workExperience: WorkExperience;
    onChange: (wk: WorkExperience) => void;
    onDelete?: () => void
}

const EditableWorkExperience = styled.div`
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

export default (props: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);

    return <EditableWorkExperience>
        <div>
            <h3>
                <EditableInput placeHolder="Work Title" value={props.workExperience?.title} onChange={(title) => props.onChange({
                    ...props.workExperience,
                    title
                })} />
            </h3>
        </div>
        <div>
            <EditableInput placeHolder="Company" value={props.workExperience?.companyName} onChange={(companyName) => props.onChange({
                ...props.workExperience,
                companyName
            })} />
        </div>
        <div>
            <EditableInput placeHolder="Location" value={props.workExperience?.location} onChange={(location) => props.onChange({
                ...props.workExperience,
                location
            })} />
        </div>
        <div>
            <EditableRangeDatePicker value={props.workExperience?.period as string[]} onChange={(period) => props.onChange({
                ...props.workExperience,
                period
            })} />
        </div>
        <div>
            <EditableInput minHeight="200px" placeHolder="Work History" value={props.workExperience.description} onChange={(description) => props.onChange({
                ...props.workExperience,
                description
            })} />
        </div>


        <div className="deleting-overlay" style={{display: isDeleting ? "unset" : "none"}}/>
        <MinusCircleTwoTone className="delete-icon" 
            twoToneColor={colors.red} 
            onClick={() => props.onDelete()} 
            onMouseEnter={() => setIsDeleting(true)}
            onMouseLeave={() => setIsDeleting(false)}
        />
    </EditableWorkExperience>
}
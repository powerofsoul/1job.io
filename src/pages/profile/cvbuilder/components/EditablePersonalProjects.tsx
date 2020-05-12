import React, { useState } from "react";
import { WorkExperience, WorkProject } from "../../../../../models/Employee";
import EditableInput from "./EditableInput";
import styled from "styled-components";
import Space from "../../../../style/Space";
import EditableRangeDatePicker from "./EditableRangeDatePicker";
import { MinusCircleTwoTone } from "@ant-design/icons";
import colors from "../../../../style/Colors";

interface Props {
    workProject: WorkProject;
    onChange: (wp: WorkProject) => void;
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
                <EditableInput placeHolder="Name" value={props.workProject?.name} onChange={(name) => props.onChange({
                    ...props.workProject,
                    name
                })} />
            </h3>
        </div>
        <div>
            <EditableInput placeHolder="http://..." value={props.workProject?.link} onChange={(link) => props.onChange({
                ...props.workProject,
                link
            })} />
        </div>
        <div>
            <EditableRangeDatePicker value={props.workProject?.period as string[]} onChange={(period) => props.onChange({
                ...props.workProject,
                period
            })} />
        </div>
        <div>
            <EditableInput minHeight="200px" placeHolder="Description" value={props.workProject.description} onChange={(description) => props.onChange({
                ...props.workProject,
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
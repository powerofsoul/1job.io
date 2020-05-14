import React, { useState } from "react";
import { WorkExperience, Education } from "../../../../../models/Employee";
import EditableInput from "./EditableInput";
import styled from "styled-components";
import Space from "../../../../style/Space";
import EditableRangeDatePicker from "./EditableRangeDatePicker";
import { MinusCircleTwoTone, MinusCircleFilled } from "@ant-design/icons";
import colors from "../../../../style/Colors";
import { Tag, Button } from "antd";
import BaseEditableContent from "./BaseEditableContent";
import EditableStringArray from "./EditableStringArray";

interface Props {
    education: Education;
    onChange: (education: Education) => void;
    onDelete?: () => void
}

const EditableWorkExperience = styled(BaseEditableContent)`
    .delete-course-icon {
        margin-left: 10px;
    }

    .add-course {
        margin-top: ${Space.sm};
    }
`;

export default (props: Props) => {
    return <EditableWorkExperience onDelete={props.onDelete}>
        <div>
            <h3>
                <EditableInput placeHolder="Institution" value={props.education?.institution} onChange={(institution) => props.onChange({
                    ...props.education,
                    institution
                })} />
            </h3>
        </div>
        <div>
            <EditableInput placeHolder="Company" value={props.education?.study} onChange={(study) => props.onChange({
                ...props.education,
                study
            })} />
        </div>
        <div>
            <EditableRangeDatePicker value={props.education?.period as string[]} onChange={(period) => props.onChange({
                ...props.education,
                period
            })} />
        </div>
        <div>
            <EditableStringArray name="course" array={props.education?.courses} onChange={(courses) => {
                props.onChange({
                    ...props.education,
                    courses
                })
            }}/>
        </div>
    </EditableWorkExperience>
}
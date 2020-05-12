import React, { useState } from "react";
import { WorkExperience, WorkProject } from "../../../../../models/Employee";
import EditableInput from "./EditableInput";
import styled from "styled-components";
import Space from "../../../../style/Space";
import EditableRangeDatePicker from "./EditableRangeDatePicker";
import { MinusCircleTwoTone } from "@ant-design/icons";
import colors from "../../../../style/Colors";
import BaseEditableContent from "./BaseEditableContent";

interface Props {
    workProject: WorkProject;
    onChange: (wp: WorkProject) => void;
    onDelete?: () => void
}

export default (props: Props) => {
     return <BaseEditableContent onDelete={props.onDelete}>
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
            <EditableInput placeHolder="Description" value={props.workProject.description} onChange={(description) => props.onChange({
                ...props.workProject,
                description
            })} />
        </div>
    </BaseEditableContent>
}
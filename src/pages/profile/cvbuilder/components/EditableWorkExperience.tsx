import React, { useState } from "react";
import { WorkExperience } from "../../../../../models/Employee";
import EditableInput from "./EditableInput";
import styled from "styled-components";
import Space from "../../../../style/Space";
import EditableRangeDatePicker from "./EditableRangeDatePicker";
import { MinusCircleTwoTone } from "@ant-design/icons";
import colors from "../../../../style/Colors";
import BaseEditableContent from "./BaseEditableContent";

interface Props {
    workExperience: WorkExperience;
    onChange: (wk: WorkExperience) => void;
    onDelete?: () => void
}

export default (props: Props) => {
    return <BaseEditableContent onDelete={props.onDelete}>
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
            <EditableInput placeHolder="Work History" value={props.workExperience.description} onChange={(description) => props.onChange({
                ...props.workExperience,
                description
            })} />
        </div>
    </BaseEditableContent>
}
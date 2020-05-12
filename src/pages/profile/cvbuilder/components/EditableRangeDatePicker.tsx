import React, { useState } from "react";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

export default (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentDates, setCurrentDates] = useState(props.value);

    const dates: [Moment, Moment] = [moment(props.value[0]), moment(props.value[1])];

    return <div>
        {!isEditing && <span onClick={() => setIsEditing(true)}>
            <span>{dates[0]?.format("MMM-YYYY")}</span>
                -
            <span>{dates[1]?.format("MMM-YYYY")}</span>
        </span>}
        {isEditing && <RangePicker autoFocus value={dates} style={{ width: "100%" }} picker="month"
            onChange={(value) => setCurrentDates([
                value[0].toISOString(),
                value[1].toISOString()
            ])}
            onBlur={(value) => {
                props.onChange(currentDates);
                setIsEditing(false);
            }} />}
    </div>
}
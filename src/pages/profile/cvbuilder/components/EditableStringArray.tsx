import React from "react"
import EditableInput from "./EditableInput"
import { Tag, Button } from "antd";
import { MinusCircleTwoTone } from "@ant-design/icons";
import colors from "../../../../style/Colors";
import Space from "../../../../style/Space";

interface Props {
    array: string[];
    onChange: (values: string[]) => void;
    wrapper?: any;
    name: string;
}

export default (props: Props) => {
    const Wrapper = props.wrapper || Tag;
    return <div style={{ marginRight: Space.sm }}>
        {props.array?.map((e, i) => <Wrapper>
            <EditableInput value={e} key={i} onChange={(value: string) => props.onChange([
                ...props.array.slice(0, i),
                value,
                ...props.array.slice(i + 1)
            ])}>
                <MinusCircleTwoTone className="delete-course-icon" twoToneColor={colors.red} onClick={
                    (e) => {
                        props.onChange([

                            ...props.array.slice(0, i),
                            ...props.array.slice(i + 1),
                        ])
                        e.preventDefault();
                    }
                } />
            </EditableInput>
        </Wrapper>)}
        <div>
            <Button type="dashed" style={{ marginTop: Space.sm }} onClick={() => {
                props.onChange([
                    ...props.array,
                    props.name
                ])
            }}>+ Add {props.name}</Button>
        </div>
    </div>
}
import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd"
import { MinusCircleOutlined, PlusOutlined, MinusCircleTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import colors from "../../../style/Colors";

interface Props {
    className?: string;
    name: string | string[];
    label?: string;
    emptyFieldError: string;
    addButtonText: string;
    placeholder?: string;
    wrapperCol?: any;
    noLabelWrapperCol?: any;
    field?: (data) => any;
}

const ArrayFormItem = styled.div`
    .main-item{
        position: relative;
    }

    .ant-form-item-control-input-content {
        display: flex;
        align-items: center;

        .dynamic-delete-button {
            margin-left: auto;
            z-index: 99;
        }
    }

    .ArrayFormItem__field {
        margin: 0;
        width: 100%;
    }

    .ArrayFormItem__field .ant-form-item-control-input-content {
        display: block;
    }
`;

const DeletingOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 80;
    background-color: ${colors.red};
`;

const Component = (props: Props) => {
    const [deletingFieldIndex, setDeletingFieldIndex] = useState(-1);

    React.useEffect(()=> {
        setDeletingFieldIndex(-1);
    }, [props])

    const simpleField = ((field) => <Form.Item
        {...field}
        validateTrigger={['onChange', 'onBlur']}
        rules={[
            {
                required: true,
                whitespace: true,
                message: props.emptyFieldError,
            },
        ]}
        noStyle
    >
        <Input placeholder={props.placeholder} />
    </Form.Item>)


    const fieldModel = props.field || simpleField;


    return <Form.List name={props.name}>
        {(fields, { add, remove }) => {
            return (
                <ArrayFormItem className={props.className}>
          
                    {fields.map((field, index) => (
                        <Form.Item
                            wrapperCol={{ ...(index === 0 ? props.label ? props.wrapperCol : props.noLabelWrapperCol : props.noLabelWrapperCol) }}
                            label={index === 0 ? props.label : ''}
                            required={false}
                            key={field.key}
                            className="main-item"
                        >
                            {index == deletingFieldIndex && <DeletingOverlay />}
                            {fieldModel({ ...field, className: "ArrayFormItem__field" })}
                            <div className="dynamic-delete-button">
                                <MinusCircleTwoTone
                                    onMouseEnter={() => setDeletingFieldIndex(index)}
                                    onMouseLeave={() => setDeletingFieldIndex(-1)}
                                    style={{ marginLeft: "8px" }}
                                    twoToneColor={colors.red}
                                    onClick={() => {
                                        setDeletingFieldIndex(-1);
                                        remove(field.name);
                                    }}
                                />
                            </div>
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ ...props.noLabelWrapperCol }}>
                        <Button
                            type="dashed"
                            onClick={() => {
                                add();
                            }}
                            style={{ width: '60%' }}
                        >
                            <PlusOutlined />{props.addButtonText}
                        </Button>
                    </Form.Item>
                </ArrayFormItem>
            );
        }}
    </Form.List>
}

const wrapperCol = {
    xs: { span: 24 },
    sm: { span: 24 },
}

Component.defaultProps = {
    wrapperCol,
    noLabelWrapperCol: {
        ...wrapperCol,
        sm: {
            span: wrapperCol.sm,
            offset: 3
        }
    }
} as Partial<Props>

export default Component;
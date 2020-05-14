import PageCardContainer from "../common/PageCardContainer"
import React, { useState } from "react"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css"
import colors from "../style/Colors";
import { Button, Row, Col, Input } from "antd";
import styled from "styled-components";
import Space from "../style/Space";
import socketIOClient from "socket.io-client";
import { API_END_POINT } from "../Utils";

const InerviewPage = styled(PageCardContainer)`
    .editor{ 
        margin-bottom: ${Space.sm};
    }

    .output {
        background-color: ${colors.silver};
        margin-top: ${Space.sm};
    }

    .chat {
        background-color: ${colors.silver};
        padding: ${Space.sm};
        margin-bottom: ${Space.md};
    }

`;

let socket;

export default () => {
    const [code, setCode] = useState("function () {}");
    const [output, setOutput] = useState("");
    const [messages, setMessage] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");


    const changeCode = (code: string) => {
        socket.emit("code", code);
        setCode(code);
    }

    const sendMessage = () => {
        socket.emit("message", currentMessage);
        setCurrentMessage("");
        setMessage([
            ...messages,
            currentMessage
        ]);
    }

    React.useEffect(() => {
        console.log = (message) => {
            setOutput(message);
            socket.emit("output", message);
        };
        socket = socketIOClient(API_END_POINT);
        socket.on("connected", data => {
            setCode(data.code);
            setMessage(data.messages);
        });

        socket.on("message", data => {
            setMessage(data);
        })

        socket.on("code", data => {
            setCode(data);
        })

        socket.on("output", output => {
            setOutput(output);
        })
    }, [])

    const run = () => {
        try {
            eval(code);
        } catch (err) {
            setOutput(err.toString());
            socket.emit("output", err.toString());
        }
    }

    return <InerviewPage>
        <Row gutter={[12, 12]}>
            <Col xs={24} lg={16}>
                <Editor
                    value={code}
                    className="editor"
                    onValueChange={changeCode}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 17,
                        backgroundColor: colors.silver
                    }}
                />
                <Button type="primary" onClick={run}>Run</Button>
                <div className="output">
                    <code>
                        {output}
                    </code>
                </div>
            </Col>
            <Col xs={24} lg={8}>
                <div className="chat">
                    {messages.map((m, i) => {
                        return <div key={i}>
                            {m}
                        </div>
                    })}
                </div>

                <Row gutter={[12,12]}>
                    <Col>
                        <Input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                    </Col>
                    <Col>
                        <Button type="primary" onClick={sendMessage}>Send</Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    </InerviewPage>
}
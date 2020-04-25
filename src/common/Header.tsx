import styled from "styled-components";
import Colors from "../style/Colors";
import { HeartTwoTone } from "@ant-design/icons";

const Header = styled.div`
    width: 100%;
    height: 50px;
    color: ${Colors.dark_dark};
    background-color: ${Colors.primary};
`;

export default () => {
    return <Header>
        Hi with love from Jobs Remotely Online
        <HeartTwoTone className="hearth"/>
    </Header>
}
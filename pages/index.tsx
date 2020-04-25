import styled from 'styled-components';
import colors from '../src/style/Colors';
import Typist from 'react-typist';
import TypistLoop from "react-typist-loop";
import { Button } from 'antd';
import { FormOutlined } from "@ant-design/icons";
import Link from '../src/common/Link';

const IndexTop = styled.div`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    height: 300px;
    background-color: ${colors.green};
    display: flex;
    align-items: center;

    h1, h2 {
        color: ${colors.light};
    }

    .content {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
`;

const index = () => {
    return <div>
        <IndexTop>
            <div className="content">
                <h1>Best place to get your career running.</h1>
                <h2>
                    <TypistLoop interval={3000}>
                        {[
                            'Remote jobs for everyone',
                            'Updated daily.',
                            'Boost your career now!',
                        ].map(text => <Typist key={text} startDelay={1000}>{text}</Typist>)}
                    </TypistLoop>
                </h2>
                <Link href="/post">
                    <Button type="primary" icon={<FormOutlined />} size='large'>
                        Post a job now!
                    </Button>
                </Link>
            </div>
        </IndexTop>
    </div>
}

export default index;
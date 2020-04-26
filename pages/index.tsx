import { FormOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import Typist from 'react-typist';
import TypistLoop from "react-typist-loop";
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import JobCard from '../src/common/JobCard';
import Link from '../src/common/Link';
import { Job } from '../src/models/Job';
import { IAppState } from '../src/redux/configureStore';
import JobStore from '../src/redux/stores/JobStore';
import colors from '../src/style/Colors';
import DeviceSize from '../src/style/DeviceSize';
import { connect } from "react-redux";

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

const IndexBody = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    ${DeviceSize.lg} {
        padding-right: 15rem;
        padding-left: 15rem;
    }

    .load-more {
       text-align:center;
    }
`;

interface Props {
    jobs: Job[];
    loadMoreJobs: () => void;
}

const index = (props: Props) => {
    return <div>
        <IndexTop>
            <div className="content">
                <h1>Best place to get your career running.</h1>
                <h2>
                    <TypistLoop interval={3000}>
                        {[
                            'Remote jobs for everyone.',
                            'Updated daily.',
                            'Boost your career now!',
                            'Always fresh!'
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
        <IndexBody>
            {props.jobs.map((j, i) => <JobCard key={i} {...j} />)}
            <div className="load-more">
                <Button onClick={props.loadMoreJobs}>Load More</Button>
            </div>
        </IndexBody>
    </div>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    jobs: store.jobs.jobs
});

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(JobStore.actionCreators, dispatch)
)(index);

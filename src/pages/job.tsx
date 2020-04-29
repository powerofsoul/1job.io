import { useRouter } from 'next/router';
import { IAppState } from '../redux/configureStore';
import { Job } from '../../models/Job';
import { connect } from 'react-redux';
import { Tag, Row, Col } from "antd";
import colors from '../style/Colors';
import styled from 'styled-components';

interface Props {
    job: Job
}

const JobDetails = styled.div`
    .JobDetailsHeader {
        align-items:center;

        .CompanyDetails {
            display: block;
            align-items:center;

            .companyLogo {
                float: left;
                margin-top: 1rem;
                margin-right: 1rem;
                min-height: 5rem;
                max-height: 5rem;
                min-width: 5rem;
                max-width: 5rem;
                border-radius: 50%;
            }
        }
    }
    .JobDetailsBody {
        align-items:center;
        margin-top: 2rem;
    }
`;

export default (props: Props) => {
    const router = useRouter();
    const { id } = router.query;

    return <JobDetails>
        <Row justify="center">
            <Col xs={24} md={7}>
                <div className="JobDetailsHeader">
                    <div>
                        POSTED MAY 21
                    </div>
                    <h1>
                        Front End Web Developer ~ Virtual Office
                    </h1>
                    <div>
                        <Tag color={colors.orange}>
                            FULL-TIME
                        </Tag>
                        <Tag color={colors.orange}>
                            PROGRAMMING
                        </Tag>
                        <Tag color={colors.orange}>
                            FRONT-END
                        </Tag>
                        <Tag color={colors.orange}>
                            REMOTE
                        </Tag>
                        <Tag color={colors.orange}>
                            JAVA
                        </Tag>
                    </div>
                    <div className="CompanyDetails">
                        <img className="companyLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/9GAG_new_logo.svg/1200px-9GAG_new_logo.svg.png" />
                        <h3>Company Name</h3>
                        <div>9GAG is your best source of FUN! Explore 9GAG for the most popular memes, breaking stories, awesome GIFs, and viral videos on the internet!</div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row justify="center">
            <Col xs={24} md={7}>
                <div className="JobDetailsBody">
                    <div>
                        The Culture
                        KBMax is a rapidly expanding CPQ & 3D software & services company based in Austin, TX with technology centers in Portland, Oregon and Parma, Italy. Our product configurators automate the design and quote process for custom products, and our interactive 3D products help raise conversion rates for E-Commerce companies around the world.

                        Our virtual office model requires professionals who understand communication, accountability, and teamwork. We succeed because our people are responsible to each other and care about the company. This entrepreneurial attitude is important to our culture and is built into compensation packages for appropriate employees.

                        Our employees are at their best when happy and rested.  Four weeks paid vacation is standard for new hires with flexible scheduling for personal and sick days.


                        The Position
                        As a KBMax front-end developer, you will utilize your mastery of HTML, CSS, and Typescript to engineer the front-end of our next generation cloud-based configurator platform.  You will utilize modern SPA frameworks (Angular, Vue) and responsive design to develop new and creative user experiences.  Your work will be prominently displayed on the websites of some of the biggest brands in the world.

                        You will be flexible and adaptive in your work, and have a strong and persistent desire to learn.  As you become comfortable at KBMax, you will be encouraged to grow and expand your horizons.  We are at the cutting edge of many technologies to expand your horizons including 3D (WebGL & CAD API’s), Enterprise Software Integration (Salesforce.com, ERP), Cloud Architecture, Databases & ElasticSearch.

                        You will be comfortable talking to customers, demoing your work in front of small audiences, and speak fluent English.  Communication is paramount at KBMax.

                        Please be prepared to present a strong portfolio of work during the interview process.


                        Responsibilities
                        -Architect, develop, maintain and test our next generation cloud configurator platform
                        -Collaborate with a small team of developers in a fast-paced agile environment
                        -Engage with KBMax engineers and customers for feedback, feature requests, and solutions
                        </div>
                </div>
            </Col>

        </Row>
    </JobDetails>
}

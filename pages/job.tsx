import { useRouter } from 'next/router';
import { IAppState } from '../src/redux/configureStore';
import { Job } from '../models/JobModel';
import { connect } from 'react-redux';

interface Props {
    job: Job
}

export default (props: Props) => {
    const router = useRouter();
    const {id} = router.query;

    return <div>
        Job with id: {id}
    </div>
}

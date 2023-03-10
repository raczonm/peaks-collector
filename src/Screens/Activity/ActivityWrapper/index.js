
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StartActivity from '../StartActivity';
import PendingActivity from '../PendingActivity';
import StoppedActivity from '../StoppedActivity';
import ModalSpinner from '../../../Components/ModalSpinner';

import { getUserLocationRequest } from '../../../Store/actions';

export default ({ navigation }) => {
    const dispatch = useDispatch();

    const { currentUserPosition } = useSelector(state => state.mapLocation);
    const currentActivity = useSelector(state => state.currentActivity);

    console.log(currentActivity);

    useEffect(() => { dispatch(getUserLocationRequest()); }, []);

    if (!currentUserPosition) return <ModalSpinner isVisible={true} label="Checking You Position..." />

    if (!currentActivity.isActive) return <StartActivity currentUserPosition={currentUserPosition} navigation={navigation} />
    if (currentActivity.isPending) return <PendingActivity currentUserPosition={currentUserPosition} currentActivity={currentActivity} />
    
    return <StoppedActivity currentActivity={currentActivity} currentUserPosition={currentUserPosition} />
}
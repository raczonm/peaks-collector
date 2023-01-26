import { FlatList, Text } from 'react-native';

import PeakCard from '../../../Components/PeakCard';
import PeakCardLoader from '../../../Components/PeakCardLoader';

export default ({ navigation, peaks }) => {
    const handleOnPress = peakId => navigation.navigate('Peak details', { peakId});

    return <FlatList
        renderItem={({ item }) => item.name ? <PeakCard onPress={() => handleOnPress(item.id)} peak={item} /> : <PeakCardLoader />}
        keyExtractor={item => item.activityId}
        data={peaks}
    />;
}

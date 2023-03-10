import { StyleSheet, FlatList } from 'react-native';

import PeakCard from '../../../Components/PeakCard';
import PeakCardLoader from '../../../Components/PeakCard/PeakCardLoader';

export default ({ peaks }) => {
    return  (
        <FlatList
            renderItem={({ item }) => item.name ? <PeakCard peak={item} /> : <PeakCardLoader />}
            keyExtractor={item => item.id}
            data={peaks}
            contentContainerStyle={styles.wrapper}
        />
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 5
    }
});
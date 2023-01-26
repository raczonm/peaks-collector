import { useTheme, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ isEditable, rating = 3.43 }) => {
    const theme = useTheme();

    const handleStarPress = index => console.log('pressed ', index);

    const renderStar = index => {
        const isMarked = (rating - index ) > 0.5;
    
        return (
            <MaterialCommunityIcons
                key={index}
                name={isMarked ? 'star' : 'star-outline'}
                color={isMarked ? theme.colors.primary : theme.colors.lightGray}
                size={35}
            />
         );
    }

    return <View style={styles.ratingWrapper(theme)}>
        <Text variant="titleMedium">Current rating:</Text>
        <View style={styles.starsWrapper}>
            {[...Array(5).keys()].map(renderStar)}
        </View>
    </View>;
};

const styles = StyleSheet.create({
    ratingWrapper: theme => ({
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: theme.colors.lightGray,
        borderTopWidth: 1,
        borderBottomWidth: 1
    }),
    starsWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    imagePlaceholderIcon: {
        // alignSelf: 'center'
    }
});
import { useTheme, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ value, setValue }) => {
    const theme = useTheme();

    const handleStarPress = index => setValue(index + 1)

    const renderStar = index => {
        const isMarked = (value - index ) > 0.5;
    
        return (
            <TouchableOpacity onPress={() => handleStarPress(index)} key={index}>
                <MaterialCommunityIcons
                    name={isMarked ? 'star' : 'star-outline'}
                    color={isMarked ? theme.colors.primary : theme.colors.lightGray}
                    size={30}
                />
            </TouchableOpacity>
         );
    }

    return (
        <View style={styles.starsWrapper}>
            {[...Array(5).keys()].map(renderStar)}
        </View>
    )
};

const styles = StyleSheet.create({
    starsWrapper: {
        marginTop: -5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
    }
});
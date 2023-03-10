import { Text, useTheme } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';

import tempIcon from '../../../Assets/tempAchievements/peaksIcon.png';
import styleHelpers from '../../../Helpers/styleHelpers';

export default ({ name, info, withLevels, levels, currentCount, isCompleted }) => {
    const theme = useTheme();

    const getCurrentLevel = () => {
        if (currentCount === 0) return 0;
        
        const _levelIndex = levels.findIndex(level => level > currentCount);

        return _levelIndex === -1 ? levels.length : _levelIndex;
    }

    const currentLevel = withLevels ? getCurrentLevel() : 0;
    const mainColor = theme.colors.achievements.levels[currentLevel];

    return (
        <View style={[styleHelpers.horizontalWrapper, styles.wrapper(theme)]}>
            <View style={styles.iconWrapper(mainColor)}>
                <Image source={tempIcon} style={styles.icon} />
            </View>
            <View style={styles.contentWrapper}>
                <Text variant="titleSmall" style={styles.title(mainColor)}>{name}</Text>
                <Text style={styles.description(theme)}>{info}</Text>
                <View style={{ position: 'relative', marginTop: 10 }}>
                    <View style={{ height: 10, borderRadius: 5, backgroundColor: theme.colors.lightGray }} />
                    <View style={{ position: 'absolute', top: 0, height: 10, borderRadius: 5, backgroundColor: mainColor, width: '30%' }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: theme => ({
        backgroundColor: theme.colors.white80,
        margin: 5,
        marginBottom: 0
    }),
    iconWrapper: backgroundColor => ({
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 80,
        width: 80,
        backgroundColor,
    }),
    icon: {
        width: 50,
        height: 50
    },
    contentWrapper: {
        paddingHorizontal: 10,
        flexGrow: 1,
        flexShrink: 1
    },
    title: color => ({
        fontWeight: 'bold', 
        color
    }),
    description: theme => ({
        fontSize: 10,
        color: theme.colors.darkGray,
        marginTop: 2 
    })
})
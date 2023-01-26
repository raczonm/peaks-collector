import { useContext, useState, useEffect } from 'react';
import { Avatar, Button, Card, Title, Text, Paragraph, useTheme } from 'react-native-paper';
import { Image, View } from 'react-native';

import Star from './Star';
import achievementRibbon from '../../../Assets/achievementRibbon.png';
import achievementRing from '../../../Assets/achievementRing.png';
import tempIcon from '../../../Assets/tempAchievements/peaksIcon.png';


export default ({ name, withLevels, levels, currentCount, isCompleted }) => {
    const theme = useTheme();

    const getCurrentLevel = () => {
        if (currentCount === 0) return 0;
        
        const _levelIndex = levels.findIndex(level => level > currentCount);

        return _levelIndex === -1 ? levels.length : _levelIndex;
    }

    const currentLevel = withLevels ? getCurrentLevel() : 0;
    const isNotStarted = (withLevels && currentLevel === 0) && !isCompleted;
    const mainColor = theme.colors.achievements.levels[currentLevel];

    const renderStars = () => {
        if (isNotStarted) return null;

        const isEvenLevel = currentLevel % 2 === 0;

        return [...Array(currentLevel).keys()].map(key => {
            const position = isEvenLevel ? Math.round((key + 1) / 2) : Math.round((key + 2) / 2);
            const horizontalPosition = isEvenLevel ? (key % 2 === 0 ? 1 : -1) : ((key + 1) % 2 === 0 ? 1 : -1);

            if (!isEvenLevel) return <Star position={{top: 10 + (position - 1) * 7, left: horizontalPosition * ((position - 1) * 16) - 6 }} color={mainColor} />;
            

            return <Star position={{ top: 10 + (position - 1) * 7, left: horizontalPosition * (8 + (position - 1) * 14) - 6 }} color={mainColor} />
        });
    }

    return <View style={{ width: '33.3%', alignItems: 'center', padding: 5 }}>
        <View style={{ width: '100%', backgroundColor: `${theme.colors.achievements.levels[currentLevel]}10`, borderColor: theme.colors.achievements.levels[currentLevel], borderWidth: 2 }}>
            <View style={{ height: 130, alignSelf: 'center', alignItems: 'center',  position: 'relative', marginBottom: 15 }}>
                {renderStars()}
                <Image source={achievementRibbon} style={{ tintColor: isNotStarted ? theme.colors.achievements.levels[0] : theme.colors.achievements.ribbon, position: 'absolute', bottom: 0, width: 100, height: 93 }} />
                <Image source={achievementRing} style={{ tintColor: theme.colors.achievements.levels[currentLevel], position: 'absolute', bottom: 0, width: 100, height: 93 }} />
                <Image source={tempIcon} style={{ tintColor: mainColor, position: 'absolute', bottom: 25, width: 52, height: 52 }} />
            </View>
            <View style={{ backgroundColor: mainColor, justifyContent: 'center', paddingHorizontal: 10, height: 40 }}>
                <Text variant="titleSmall" style={{color: theme.colors.white, textAlign: 'center', lineHeight: 15, }}>{name}</Text>
            </View>
        </View>
    </View>

    // return <View style={{ width: '33.3%', alignItems: 'center', height: 200 }}>
    //     <View style={{ height: 140, alignSelf: 'center', alignItems: 'center', marginBottom: 10, position: 'relative' }}>
    //         {renderStars()}
    //         <Image source={achievementRibbon} style={{ tintColor: isNotStarted ? theme.colors.achievements.levels[0] : theme.colors.achievements.ribbon, position: 'absolute', bottom: 0, width: 110, height: 102 }} />
    //         <Image source={achievementRing} style={{ tintColor: theme.colors.achievements.levels[currentLevel], position: 'absolute', bottom: 0, width: 110, height: 102 }} />
    //         <Image source={tempIcon} style={{ tintColor: theme.colors.achievements.levels[currentLevel], position: 'absolute', bottom: 20, width: 70, height: 70 }} />
    //     </View>
    //     <Text variant="titleMedium" style={{ color: theme.colors.achievements.levels[currentLevel], paddingHorizontal: 10, textAlign: 'center', lineHeight: 17 }}>{name}</Text>
    // </View>
}
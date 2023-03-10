
import { FlatList } from 'react-native';

import Achievement from './Achievement';

const AchievementsList = [
    {
        id: 0,
        name: 'Peaks Collector',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 1,
        name: 'Globetrotter',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },

    {
        id: 2,
        name: 'Reporter',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 3,
        name: 'Birthday Climber man',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 4,
        name: 'Lipsum',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 5,
        name: 'Dolor sit amet',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        notStartedDescription: 'You have not visited any peaks yet, visit #firstLevelRequirement to achieve bronze level',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 6,
        name: 'Super highlight',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        notStartedDescription: 'You have not visited any peaks yet, visit #firstLevelRequirement to achieve bronze level',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 7,
        name: 'Booyaaa',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        notStartedDescription: 'You have not visited any peaks yet, visit #firstLevelRequirement to achieve bronze level',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 8,
        name: 'Birthday Climber man',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        notStartedDescription: 'You have not visited any peaks yet, visit #firstLevelRequirement to achieve bronze level',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    },
    {
        id: 9,
        name: 'Some achievemtn',
        info: 'Badge granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        notStartedDescription: 'You have not visited any peaks yet, visit #firstLevelRequirement to achieve bronze level',
        inProgressDescription: 'You have visited #currentCount peaks, visit #countDifference more peaks to achieve next level',
        completedDescription: 'You have visited $count peaks, impresive!',
        baseImageUrl: 'imageurl', // for 0 level
        completeImageUrl: 'imageUrl', // for achievements without levels like birthday Peak etc
        withLevels: true, // true for acheivements with levels
        connectedProperty: 'totalPeaksCount', // mostly for backend - property sued for calculations
        levels: [ 3, 12, 30, 100, 250, 1000] // or null for achievemts without level
    }
];

const userAchievemets = [
    // all started achievements should be listed, even when still in 0 level,
    // should be sorted by highest levelts ?? to be discussed
    {
        id: 0,
        currentCount: 1001, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 1,
        currentCount: 252, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 2,
        currentCount: 120, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 3,
        currentCount: 50, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 4,
        currentCount: 18, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 5,
        currentCount: 10, // only for achievements with levels, 
        isCompleted: false 
    },
    {
        id: 6,
        currentCount: 2, // only for achievements with levels, 
        isCompleted: false 
    },
]


export default () => {
    const calculatedAchievements = AchievementsList.reduce((acc, achievement) => {
        return [
            ...acc,
            { 
                ...achievement,
                currentCount: 0,
                isCompleted: false,
                ...userAchievemets.find(userAchiement => userAchiement.id === achievement.id)
            }
        ];
    }, []);

    return <FlatList
        renderItem={({ item }) => <Achievement {...item} />}
        keyExtractor={item => item.id}
        data={calculatedAchievements}
    />;
}

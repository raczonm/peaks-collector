import tempIcon from '../../Assets/tempAchievements/peaksIcon.png';

const ENTRANCES_STATS = {
    totalEntrancesAmount: 0,
    totalUniqueEntrancesAmount: 0,
    maxDayEntrancesAmount: 0,
    maxWeekEntrancesAmount: 0,
    maxMonthEntrancesAmount: 0,
    maxYearEntrancesAmount: 0,
    longestEntrancesDaysStreak: 0,
    longestEntrancesWeeksStreak: 0,
    totalCountriesVisited: 0,
    totalContinentsVisited: 0,
    totalEntrancesOnSpring: 0,
    totalEntrancesOnSummer: 0,
    totalEntrancesOnAutumn: 0,
    totalEntrancesOnWinter: 0,
    totalUniquePeaksInSingleRange: 0,
    maxPeakHeight: 0,
    totalSmallPeaks: 0,
    total1kPeaks: 0,
    total2kPeaks: 0,
    total3kPeaks: 0,
    total4kPeaks: 0,
    total5kPeaks: 0,
    total6kPeaks: 0,
    total7kPeaks: 0,
    total8kPeaks: 0,
    sevenSummitsPeaks: 0,
    earthCrownPeaks: 0,
    totalPhotosAdded: 0,
    maxSinglePeakPhotosAdded: 0,
    totalCommentsAdded: 0,
}

export const BADGES = [
    {
        id: 0,
        name: 'Bronze',
        color: rgba(107, 53, 21, 1),
        fadeColor: rgba(107, 53, 21, 0.1)
    },
    {
        id: 1,
        name: 'Silver',
        color: rgba(207, 207, 207, 1),
        fadeColor: rgba(207, 207, 207, 0.1)
    },
    {
        id: 3,
        name: 'Golden',
        color: rgba(232, 182, 30, 1),
        fadeColor: rgba(232, 182, 30, 0.1)
    },
    {
        id: 4,
        name: 'Amethyst',
        color: rgba(177, 81, 207, 1),
        fadeColor: rgba(177, 81, 207, 0.1)
    },
    {
        id: 4,
        name: 'Emerald',
        color: rgba(57, 204, 74, 1),
        fadeColor: rgba(57, 204, 74, 0.1)
    },
    {
        id: 5,
        name: 'Diamond',
        color: rgba(129, 240, 238, 1),
        fadeColor: rgba(129, 240, 238, 0.1)
    },
];

export const ACHIEVEMENTS = [
    {
        id: 0,
        name: 'Peaks Collector',
        info: 'Achievement granted for total amount of different peaks you have visited, collect new peaks to achieve next levels!',
        nextLevelInfo: (current, nextDiff, nextBadgeName) => `You have visited ${current} peaks, visit ${nextDiff} more peaks to achieve ${nextBadgeName} badge!`,
        icon: tempIcon,
        connectedPropertyName: 'totalPeaksCount',
        badgesRequirements: [3, 12, 30, 100, 250, 1000]
    }
];


export const createInitialState = () => {
    return ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        previousBadge: -1,
        previousCount: 0,
        currentBadge: -1,
        currentCount: 0,
        isBadgeUpdated: false
    }));
};

const getCurrentBadge = () => {    
    const _levelIndex = levels.findIndex(level => level > currentCount);

    return _levelIndex === -1 ? levels.length : _levelIndex;
}

const updateAchievements = (stats, achievements) => {
    const achievementsWithNewBadges = [];
    const newAchievements = achievements.map(achievement => {
        const currentCount = stats[achievement.connectedPropertyName];
        const currentBadge = achievement.badgesRequirements.findIndex(requirement => currentCount > requirement);
        
        if (achievement.previousBadge !== currentBadge) achievementsWithNewBadges.push(achievement.id);
        
        return {
            ...achievement, 
            previousCount: achievement.currentCount,
            previousBadge: achievement.previousBadge,
            currentCount,
            currentBadge,
        };
    });

    return { achievementsWithNewBadges, achievements: newAchievements };
}

const calculateNewEntrancesStats = entrances => {

}
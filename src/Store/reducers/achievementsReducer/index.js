import {} from '../../actions/actionTypes';
import achievemts, { createInitialState } from '../../../Helpers/achievements';

const initialState = {
    stats: {
        // entrances
        totalEntrancesAmount: 0, // total entrances amount
        totalUniqueEntrancesAmount: 0, // unique peaks
        maxDayEntrancesAmount: 0, // max peaks visited on single day 
        maxWeekEntrancesAmount: 0, // last 7 days
        maxMonthEntrancesAmount: 0, // last 31 days
        maxYearEntrancesAmount: 0, // calendar year or 365 days ?
        longestEntrancesDaysStreak: 0, // consecutive days with at least 1 entrance,
        longestEntrancesWeeksStreak: 0, //  consecutive weeks with at least 1 entrance,
        totalCountriesVisited: 0, // total different countries visited
        totalContinentsVisited: 0,// total different continents visited
        totalEntrancesOnSpring: 0, // total number of entrances during spring season
        totalEntrancesOnSummer: 0, // total number of entrances during summer season
        totalEntrancesOnAutumn: 0, // total number of entrances during autumn season
        totalEntrancesOnWinter: 0, // total number of entrances during autumn season
        totalUniquePeaksInSingleRange: 0, // totlan number of unique peaks in songle range - ranges data required
        maxPeakHeight: 0, // highest visited peak
        totalSmallPeaks: 0, // total peaks with attitude lower than 1000
        total1kPeaks: 0, // total peaks with attitude higher than 1000
        total2kPeaks: 0, // total peaks with attitude higher than 2000
        total3kPeaks: 0, // total peaks with attitude higher than 3000
        total4kPeaks: 0, // total peaks with attitude higher than 4000
        total5kPeaks: 0, // total peaks with attitude higher than 5000
        total6kPeaks: 0, // total peaks with attitude higher than 6000
        total7kPeaks: 0, // total peaks with attitude higher than 7000
        total8kPeaks: 0, // total peaks with attitude higher than 8000,
        sevenSummitsPeaks: 0, // number of highest peaks on each continent
        earthCrownPeaks: 0, // number of highest peaks of different countries ie. "Rysy"
        totalPhotosAdded: 0, // total amount of photos added
        maxSinglePeakPhotosAdded: 0, // max number of peaks
        totalCommentsAdded: 0, // number of comments added to peaks
        // activities
        // wishlist
        // special
    },
    achievementsWithNewBadges: [],
    achievements: createInitialState(),
    helpers: {
        currentWeekEntrancesAmount: 0,
        currentMonthEntrancesAmount: 0,
        currentYearEntrancesAmount: 0,
        currentEntrancesDaysStreak: 0,
        currentEntrancesWeeksStreak: 0
    }
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        default:
            return state;
    }
};
import haversine from 'haversine';
import { START_ACTIVITY, STOP_ACTIVITY, CANCEL_ACTIVITY, ADD_LOCATION_POINT, ADD_VISITED_PEAK, REMOVE_VISITED_PEAK, SAVE_ACTIVITY_SUCCESS, GET_PEAKS_IDS_SUCCESS } from '../../actions/actionTypes';

const initialState = {
    isActive: false,
    isPending: false,
    startTimestamp: null,
    stopTimestamp: null,
    locations: [],
    isPeaksListFetched: false,
    peaksNearby: [],
    suggestedPeaks: [],
    details: {
        duration: 0,
        distance: 0,
        altitudeDifference: 0,
        climbUp: 0,
        climbDown: 0,
        highestPoint: 0,
        lowestPoint: 0,
        averageSpeed: 0,
        maxSpeed: 0,
        currentSpeed: 0,
        visitedPeaks: [],
        
    },
    
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case START_ACTIVITY: 
            return {
                ...initialState,
                isActive: true,
                isPending: true,
                startTimestamp: Date.now()
            };
        case GET_PEAKS_IDS_SUCCESS:
            if (!payload.action === 'getActivityPeaks') return state;

            return {
                ...state,
                peaksNearby: payload.peaksIds,
                isPeaksListFetched: true
            };
        case ADD_LOCATION_POINT:
            const { startTimestamp, locations, details: { distance, climbUp, climbDown, highestPoint, lowestPoint, maxSpeed } } = state;
            const firstLocation = locations[0] || null;

            if (!firstLocation) return { ...state, locations: [ payload ] };

            const previousLocation = locations.at(-1) || null;
            const currentAltitudeDiff = previousLocation ? payload.altitude - previousLocation.altitude : 0; 
            const isClimbUp = currentAltitudeDiff > 0;
            const _duration = Date.now() - startTimestamp;
            const _currentDistance = haversine(previousLocation, payload)
            const _distance = distance + _currentDistance;
            const _currentSpeed = _currentDistance / ((payload.timestamp - previousLocation.timestamp) / 1000 / 60 / 60);

            return {
                ...state,
                locations: [ ...locations, payload ],
                details: {
                    duration: _duration,
                    distance: _distance,
                    altitudeDifference: payload.altitude - firstLocation.altitude,
                    climbUp: isClimbUp ? (climbUp + currentAltitudeDiff) : climbUp,
                    climbDown: !isClimbUp ? (climbDown + currentAltitudeDiff) : climbDown,
                    highestPoint: payload.altitude > highestPoint ? payload.altitude : highestPoint,
                    lowestPoint: (payload.altitude < lowestPoint || lowestPoint === 0) ? payload.altitude : lowestPoint,
                    averageSpeed: _distance / (_duration / 1000 / 60 / 60),
                    currentSpeed: _currentSpeed,
                    maxSpeed: _currentSpeed > maxSpeed ? _currentSpeed : maxSpeed,
                    visitedPeaks: state.details.visitedPeaks
                }
            };
        case ADD_VISITED_PEAK:
            return {
                ...state,
                visitedPeaks: [ ...state.visitedPeaks, payload ]
            };
        case REMOVE_VISITED_PEAK: 
            return {
                ...state,
                visitedPeaks: [...state.visitedPeaks].filter(visitedPeak => !visitedPeak.peakId === payload)
            }
        case STOP_ACTIVITY: 
            return {
                ...state,
                isPending: false,
                stopTimestamp: Date.now(),
                details: {
                    ...state.details,
                    duration: Date.now() - state.startTimestamp
                }
            }
        case CANCEL_ACTIVITY:
        case SAVE_ACTIVITY_SUCCESS:
            return initialState;
        default:
            return state;
    }
};
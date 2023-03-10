import haversine from 'haversine';
import { Dimensions } from 'react-native';


// FORMAT PEAK
export const formatPeak = peak => {
    return ({
        id: peak.id,
        assets: peak.assets,
        name: peak.name,
        coordinate: {
            latitude: peak.latitude,
            longitude: peak.longitude,
        },
        elevation: peak.elevation, 
        country: peak.countryCode,
        region: peak.adminName1 || peak.admin1Code,
        rating: 5,
        isOnHikingTrail: true
    });
};

// FORMAT ACCOUNT INFO
export const formatAccountInfo = account => {
    return ({
        id: account.id,
        name: account.name || account.defaultName,
        avatarUrl: account.avatarUrl,
        birthdate: account.birthdate,
        description: account.description,
        defaultMapPosition: { 
            latitude: account.defaultMapPosition[0],
            longitude: account.defaultMapPosition[1]
        },
        language: account.language,
        country: account.homeCountry
    });
};

// FORMAT MULTIPART FORM IMAGE OBJECT 
const formatImageObject = imageObject => {
    if (!imageObject) return null;

    return {
        uri: imageObject.uri,
        name: imageObject.fileName,
        type: 'image/jpg'
    };
};

// TRANSFORM FORM DATA
export const transformFormData = params => {
    let formData = new FormData();

    Object.keys(params).forEach(paramName => {
        switch (paramName) {
            case 'avatar':
                formData.append(paramName, formatImageObject(params[paramName]));
                break;
            case 'assets':
                params[paramName].forEach(asset => {
                    formData.append(paramName, formatImageObject(asset));
                })
                break;
            default:
                formData.append(paramName, params[paramName])
                break;
          }
    });

    return formData;
};

export const checkRange = (range, value) => value >= range[0] && value <= range[1];

export const filterPeaks = (peaks, filters = {}) => {
    if (!Object.keys(filters).length) return peaks;

    return peaks.reduce((acc, peak) => {
        if (filters.elevationRange && !checkRange(filters.elevationRange, peak.elevation)) return acc;
        if (filters.ratingRange && !checkRange(filters.ratingRange, peak.rating)) return acc;
        if (filters.showVisited === false && !peak.isVisited) return acc;
        if (filters.showOutsideTrails === false && !peak.isOnHikingTrail) return acc;

        return [...acc, peak];
    }, []);
};

const availableWidth = Dimensions.get('window').width - 5;
const halfAvailableWidth = availableWidth / 2;

export const getGalleryImageSize = (imageMode, adjectedImageMode) => {
    if (imageMode === 'portrait' && adjectedImageMode === 'portrait') return { width: halfAvailableWidth, height: halfAvailableWidth * 1.5 };
    if (imageMode === 'portrait' && adjectedImageMode === 'landscape') return { width: availableWidth / 3, height: (availableWidth / 3) * 1.5 };
    if (imageMode === 'portrait' && adjectedImageMode === 'square') return { width: 2 * (availableWidth / 5), height: (availableWidth / 5) * 3 };
    if (imageMode === 'landscape' && adjectedImageMode === 'landscape') return { width: halfAvailableWidth, height: 2* (halfAvailableWidth / 3) };
    if (imageMode === 'landscape' && adjectedImageMode === 'portrait') return { width: 2 * (availableWidth / 3), height: (availableWidth / 3) * 1.5 };
    if (imageMode === 'landscape' && adjectedImageMode === 'square') return { width: 3 * (availableWidth / 5), height: (availableWidth / 5) * 2 };
    if (imageMode === 'square' && adjectedImageMode === 'square') return { width: halfAvailableWidth, height: halfAvailableWidth };
    if (imageMode === 'square' && adjectedImageMode === 'portrait') return { width: 3 * (availableWidth / 5), height: (availableWidth / 5) * 3 };
    if (imageMode === 'square' && adjectedImageMode === 'landscape') return { width: 2 * (availableWidth / 5), height: (availableWidth / 5) * 2 };
};


// DATE FORMATTER
export const formatDate = date => {
    let year = date.getYear();
    let month = date.getMonth() + 1
    let day = date.getDate();

    if (year < 2000) { year += 1900; }
    if (month < 10) { month = `0${month}` }
    if (day < 10) { day = `0${day}` }

    return `${year}-${month}-${day}`;
}

//GET DURATION
export const getDuration = (start, end = Date.now()) => {
    const diff = (end - start) / 1000;
    const hours = Math.floor(diff / 3600).toString();
    const minutes = Math.floor((diff % 3600) / 60).toString();
    const seconds = Math.floor(diff % 60).toString();

    return `${hours.length > 1 ? hours : '0' + hours}:${minutes.length > 1 ? minutes : '0' + minutes}:${seconds.length > 1 ? seconds : '0' + seconds}`;
}

// GET DISTANCE
export const getDistance = (locations = []) => {
    let distance = 0;
    if (locations.length < 2) return distance.toFixed(2);

    distance = locations.reduce((acc, location, index) => {
        return index === locations.length - 1 ? acc : acc + haversine(location, locations[index + 1]);
    }, 0);

    return distance.toFixed(2);
}

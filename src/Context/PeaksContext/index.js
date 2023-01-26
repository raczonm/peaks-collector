import { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import peaksApi from '../../Api/PeaksApi';
import AccountContext from '../AccountContext';
import { formatPeak } from '../../Helpers';

const PeaksContext = createContext();

export const PeaksProvider = ({ children }) => {
    const [peaks, setPeaks] = useState({});
    const [isFirstLoaded, setIsFirstLoaded] = useState(false);

    const { entrances, wishlist } = useContext(AccountContext);

    // FOR FUTURE TO SAVE PEAKS LIST ON DEVICE STORAGE
    const savePeaksToStorage = async () => {
        await SecureStore.setItemAsync('peaks', JSON.stringify(peaks));
    }

    // GET PEAKS IDS LIST
    const getPeaksIds = ({ params, successCallback, fetchDataSuccessCallback  }) => {
        peaksApi.post('/get_peaks_ids', params)
            .then(response => {
                const peaksIds = response.data;
                successCallback && successCallback(peaksIds.map(peak => peak.peakId));
                getPeaksByIds({ peaksIds, successCallback: fetchDataSuccessCallback });
            })
            .catch(error => {
                console.log({ error, params })
            });
    };

    // GET PEAKS BY IDS
    const getPeaksByIds = ({ peaksIds, successCallback = () => null }) => {
        const peaksToFetch = peaksIds.reduce((acc, peak) => {
            return peaks[peak.peakId] ? acc : [ ...acc, peak.peakId ];
        }, []);

        peaksApi.post('/get_peaks', { peakIds: peaksToFetch } )
            .then(response => {
                console.log('peaks', response.data);
                const newPeaks = response.data.reduce((acc, peak) => {
                    const _entrances = entrances.filter(entrance => entrance.peakId === peak._id);

                    return {
                        ...acc, 
                        [peak._id]: {
                            ...formatPeak(peak),
                            isVisited: !!_entrances.length,
                            isInWishlist: wishlist.includes(peak._id),
                            firstVisitedDate: !!_entrances.length ? _entrances[0].conquerDate : null
                        } 
                    };
                }, { ...peaks });
                setPeaks(newPeaks);
                successCallback && successCallback({
                    ids: peaksIds.map(peak => peak.peakId),
                    peaks: peaksIds.map(peak => newPeaks[peak.peakId])
                })
            })
            .catch(error => {
                console.log(error);
            });    
    };

    // UPDATE PEAK IN WISHLIST
    const updatePeakWishlist = (peakId, isInWishlist) => {
        setPeaks({
            ...peaks,
            [peakId]: {
                ...peaks[peakId],
                isInWishlist
            }
        })
    }
    
    // GET USER PEAKS DATA ON LOAD
    useEffect(() => {
        if (!isFirstLoaded) {
            const entrancesIds = entrances.map(peak => ({ peakId: peak.peakId }));
            const wishlistIds = wishlist.map(peak => ({ peakId: peak }));
            
            getPeaksByIds({
                peaksIds:  [...new Set([...entrancesIds, ...wishlistIds])],
                successCallback: () => setIsFirstLoaded(true)
            })
        }
    }, [entrances, wishlist]);


    return (
        <PeaksContext.Provider value={{ peaks, getPeaksIds, updatePeakWishlist }}>
            {children}
        </PeaksContext.Provider>
    );
}

export default PeaksContext;
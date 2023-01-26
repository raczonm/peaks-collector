import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import TimelineItem from './TimelineItem';

Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
}

const prepareDaysList = peaks => {
    const tempPeaks = [...peaks];
    const days = [];
    const end = new Date(peaks.at(-1).conquerDate);
    const start = new Date();

    start.setDate(start.getDate() + 1);
    let loop = new Date(start);

    while (loop >= end) {
        const datePeaks = [];

        while (tempPeaks.length && (loop.withoutTime().toString() === new Date(tempPeaks.at(0).conquerDate).withoutTime().toString())) {
            datePeaks.push(tempPeaks.shift());
        }

        days.push({
            date: new Date(loop),
            peaks: datePeaks,
            id: loop.toString()
        })

        const newDate = loop.setDate(loop.getDate() - 1);
        loop = new Date(newDate);
    }

    return days;
}

export default ({ peaks }) => {
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        setTimelineData(prepareDaysList(peaks));
    }, []);


    return <FlatList
        renderItem={({ item }) =><TimelineItem {...item} />}
        keyExtractor={item => item.id}
        data={timelineData}
        horizontal={true}
        inverted={true}
    />;
}

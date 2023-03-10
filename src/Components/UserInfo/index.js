import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useTheme, Button } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import WelcomeBack from './Slides/WelcomeBack';
import Activity from './Slides/Activity';
import Stats from './Slides/Stats';
import ModalSuccess from '../ModalSuccess';
import ModalAchievement from '../ModalAchievement';


export default () => {
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [showAchievementModal, setShowAchievementModal] = useState(false);
    const { avatarUrl, name } = useSelector(state => state.account.info);
    const carouselRef = useRef();
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            render: () => <WelcomeBack />
        }, 
        {
            render: () => <Activity />,
            dotColor: theme.colors.white,
            inactiveDotColor: theme.colors.white80,
            backgroundColor: theme.colors.primary
        },
        {
            render: () => <Stats duration={7} />
        },
        {
            render: () => <Stats duration={30} />
        }
    ];

    const renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.carouselItemWrapper(theme, item.backgroundColor)}>
               {item.render()}
            </View>
        );
    }

    return <>
        <View style={styles.carouselWrapper}>
            <Carousel
                ref={carouselRef}
                data={slides}
                renderItem={renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={slides.length}
                dotStyle={{ backgroundColor: slides[activeSlide].dotColor || theme.colors.black }}
                inactiveDotStyle={{ backgroundColor: slides[activeSlide].inactiveDotColor || theme.colors.black80 }}
                activeDotIndex={activeSlide}
                containerStyle={styles.pagination}
            />
        </View>
        {/* <ModalSuccess visible={showModal} onConfirmPress={() => setShowModal(false)} message="Something was done completely successfully" />
        <ModalAchievement visible={showAchievementModal} onConfirmPress={() => setShowAchievementModal(false)} achievement={{ name: 'Globetrotter', currentLevel: 6 }} />
        <Button onPress={() => setShowModal(true)}>modal</Button>
        <Button onPress={() => setShowAchievementModal(true)}>achievment</Button> */}
    </>
}

const styles = StyleSheet.create({
    carouselWrapper: {
        position: 'relative'
    },
    carouselItemWrapper: (theme, backgroundColor) => ({
        height: 140,
        backgroundColor: theme.colors.white,
        backgroundColor: backgroundColor || theme.colors.white,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 30
    }),
    pagination: {
        paddingBottom: 15,
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
})
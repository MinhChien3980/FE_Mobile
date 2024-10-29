import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, Text} from 'react-native';
import style from '../../style';

interface Banner {
    id: number;
    image: any;
}

const banners: Banner[] = [
    {id: 1, image: require('../../assets/images/banner_3.webp')},
    {id: 2, image: require('../../assets/images/banner_2.jpg')},
    {id: 3, image: require('../../assets/images/banner_5.jpg')},
    {id: 4, image: require('../../assets/images/banner_1.jpeg')},
    {id: 5, image: require('../../assets/images/banner_4.jpeg')},
];

// Get screen width
const {width} = Dimensions.get('window');

export function SlideBanner(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slideInterval = useRef<NodeJS.Timeout | null>(null);
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startSlideShow();
        return () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
        };
    }, []);

    const startSlideShow = () => {
        slideInterval.current = setInterval(() => {
            goToNextSlide();
        }, 3000);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        Animated.timing(translateX, {
            toValue: -index * width,
            duration: 300,
            useNativeDriver: true,
        }).start();

        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        startSlideShow();
    };

    const goToNextSlide = () => {
        const nextSlide = currentSlide === banners.length - 1 ? 0 : currentSlide + 1;
        goToSlide(nextSlide);
    };

    const goToPreviousSlide = () => {
        const prevSlide = currentSlide === 0 ? banners.length - 1 : currentSlide - 1;
        goToSlide(prevSlide);
    };

    return (
        <View style={styles.slider}>
            <Animated.View
                style={[
                    styles.slides,
                    {
                        transform: [{translateX}],
                    }
                ]}
            >
                {banners.map((banner) => (
                    <View key={banner.id} style={styles.slide}>
                        <Image source={banner.image} style={styles.image} resizeMode="contain"/> {/* Change here */}
                    </View>
                ))}
            </Animated.View>

            <View style={styles.dots}>
                {banners.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, index === currentSlide && styles.activeDot]}
                        onPress={() => goToSlide(index)}
                    />
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    slider: {
        width: '100%',
        height: 200,
        position: 'relative',
        overflow: 'hidden',
    },
    slides: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    slide: {
        width: width,
        height: '100%',
        justifyContent: 'center', // Center the image vertically
        alignItems: 'center', // Center the image horizontally
    },
    image: {
        width: '100%', // Fill the width of the container
        height: '100%', // Fill the height of the container
    },
    dots: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#aeabab',
        marginHorizontal: 5,
        borderColor: style.primaryColor
    },
    activeDot: {
        backgroundColor: style.primaryColor,
    },
    prevButton: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{translateY: -50}],
        zIndex: 1,
    },
    nextButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{translateY: -50}],
        zIndex: 1,
    },
    buttonContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});

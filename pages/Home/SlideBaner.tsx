import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, PanResponder} from 'react-native';
import style from "../../assets/styles/style";

interface Banner {
    id: number;
    image: any;
}

const banners: Banner[] = [
    {id: 1, image: require('../../assets/images/banner_3.jpg')},
    {id: 2, image: require('../../assets/images/banner_1.jpg')},
    {id: 3, image: require('../../assets/images/banner_2.jpg')},
    {id: 4, image: require('../../assets/images/banner_5.jpg')},
    {id: 5, image: require('../../assets/images/banner_4.jpg')},
];

const {width} = Dimensions.get('window');

export function SlideBanner(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState<number>(1); // Bắt đầu từ slide "giả" thứ 2
    const translateX = useRef(new Animated.Value(-width)).current; // Dịch chuyển đến slide "thực" đầu tiên
    const slideInterval = useRef<NodeJS.Timeout | null>(null);
    const isSwiping = useRef(false);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
        onPanResponderGrant: () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
            isSwiping.current = true;
        },
        onPanResponderMove: (_, gestureState) => {
            translateX.setValue(-currentSlide * width + gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
            const swipeThreshold = width / 4;
            if (gestureState.dx > swipeThreshold) {
                goToSlide(currentSlide - 1);
            } else if (gestureState.dx < -swipeThreshold) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide);
            }
            isSwiping.current = false;
            startSlideShow();
        }
    });

    useEffect(() => {
        startSlideShow();
        return () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
        };
    }, [currentSlide]);

    const startSlideShow = () => {
        if (!isSwiping.current) {
            slideInterval.current = setInterval(() => {
                goToNextSlide();
            }, 3000);
        }
    };

    const goToSlide = (index: number) => {
        Animated.timing(translateX, {
            toValue: -index * width,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // Điều chỉnh vị trí nếu vuốt qua slide giả
            if (index === 0) {
                setCurrentSlide(banners.length);
                translateX.setValue(-banners.length * width);
            } else if (index === banners.length + 1) {
                setCurrentSlide(1);
                translateX.setValue(-width);
            } else {
                setCurrentSlide(index);
            }
        });
    };

    const goToNextSlide = () => {
        goToSlide(currentSlide + 1);
    };

    return (
        <View style={styles.slider} {...panResponder.panHandlers}>
            <Animated.View
                style={[
                    styles.slides,
                    {
                        transform: [{translateX}],
                    },
                ]}
            >
                {/* Slide cuối cùng thêm vào đầu */}
                <View style={styles.slide}>
                    <Image source={banners[banners.length - 1].image} style={styles.image} resizeMode="contain"/>
                </View>

                {/* Các slide thực */}
                {banners.map((banner) => (
                    <View key={banner.id} style={styles.slide}>
                        <Image source={banner.image} style={styles.image} resizeMode="contain"/>
                    </View>
                ))}

                {/* Slide đầu tiên thêm vào cuối */}
                <View style={styles.slide}>
                    <Image source={banners[0].image} style={styles.image} resizeMode="contain"/>
                </View>
            </Animated.View>

            <View style={styles.dots}>
                {banners.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, index === currentSlide - 1 && styles.activeDot]}
                        onPress={() => goToSlide(index + 1)}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
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
        borderColor: style.primaryColor,
    },
    activeDot: {
        backgroundColor: style.primaryColor,
    },
});

export default SlideBanner;
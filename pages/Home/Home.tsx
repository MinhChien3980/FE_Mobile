// Home.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from "../../assets/styles/style";
import {HStack} from "native-base";
// import {SearchBar} from "../../components/SearchBar/SearchBar";
// import SortBar from "../../components/SortBar/SortBar";
import SlideBanner from "./SlideBaner";


const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Location</Text>
                <View style={styles.locationDetailsContainer}>
                    <Icon name="place" size={20} color={style.primaryColor}/>
                    <Text style={styles.countryText}>Thủ Đức, Việt Nam</Text>
                </View>
                <View style={styles.headerContainer}>
                    <Icon name="notifications" size={24} color={style.primaryColor}/>
                </View>
            </View>
            {/* Thanh tìm kiếm và header */}
            <View>
                <HStack
                    ml="10"
                    m="2%"
                    w="100%"
                    alignSelf="center"
                    space={2}
                    alignItems="center"
                >
                    {/*<SearchBar onSearch={}/>*/}
                    {/*<SortBar/>*/}
                </HStack>
            </View>
            {/* Banner */}
            <SlideBanner/>
            {/* Loại sản phẩm */}
            <View>
                <Text>Loại sản phẩm lấy bên productList nè</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        padding: 15,
    },
    notificationIcon: {
        marginLeft: 10,
    },
    locationContainer: {
        marginBottom: 20,
    },
    locationText: {
        fontSize: 18,
        marginBottom: 2,
        marginLeft: 5,
    },
    locationDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryText: {
        fontSize: 18,
        marginLeft: 5,
    },
});

export default Home;
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import style from "../../assets/styles/style";
import { SlideBanner } from "./SlideBaner";
// Import style
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location</Text>
        <View style={styles.locationDetailsContainer}>
          <Icon name="place" size={20} color={style.primaryColor} />
          <Text style={styles.countryText}>Thủ Đức, Việt Nam</Text>
        </View>
        <View style={styles.headerContainer}>
          <Icon name="notifications" size={24} color={style.primaryColor} />
        </View>
      </View>
      {/*thanh tìm kiếm và header ở đây*/}
      <View> header, search nè</View>
      {/*banner*/}

      <SlideBanner></SlideBanner>

      {/*loại sp*/}
      <View> Loại sản phẩm lấy bên productList nè</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
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
    flexDirection: "row",
    alignItems: "center",
  },
  countryText: {
    fontSize: 18,
    marginLeft: 5,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Home;

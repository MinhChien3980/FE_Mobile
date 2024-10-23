import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../pages/WishList/ProductListScreen';
import FavoritesScreen from '../pages/WishList/FavoritesScreen';
import {NativeBaseProvider} from 'native-base';
import Home from "@/pages/Home/Home";

const Stack = createStackNavigator();
// Định nghĩa kiểu RootStackParamList
export type RootStackParamList = {
    ProductList: undefined;
    Favorites: undefined;
};
const App = () => {
    return (
        <NativeBaseProvider>
            <Stack.Navigator initialRouteName="ProductListScreen">
                <Stack.Screen
                    name="ProductListScreen"
                    component={ProductListScreen}
                    options={{title: 'ProductListScreen'}}
                />
                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{title: 'Danh sách yêu thích'}}
                />
            </Stack.Navigator>
            {/*<Home></Home>*/}
        </NativeBaseProvider>

    );
};

export default App;


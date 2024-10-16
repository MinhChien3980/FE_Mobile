// import React from "react";
// import {NativeBaseProvider, Text, Box} from "native-base";
// import Login from "@/pages/Login/Login";
// import Home from "@/pages/Home/Home";
// import Contact from "@/pages/Contact/Contact";
//
// export default function App() {
//     return (
//         <NativeBaseProvider>
//             {/*<Login></Login>*/}
//             {/*{<Home></Home>}*/}
//             <Contact></Contact>
//         </NativeBaseProvider>
//     );
// }
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../pages/WishList/ProductListScreen';
import FavoritesScreen from '../pages/WishList/FavoritesScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{title: 'Danh sách sản phẩm'}}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{title: 'Danh sách yêu thích'}}
            />
        </Stack.Navigator>

    );
};

export default App;

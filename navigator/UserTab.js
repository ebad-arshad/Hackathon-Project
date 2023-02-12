import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/components/Home';
import Cart from '../src/components/Cart';
import Account from '../src/components/Account';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserTab = createBottomTabNavigator();

export default function TabNavigator({ user }) {

    return (
        <>
            <UserTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'Home') {
                            return focused ? <Ionicons name="md-home" size={24} color="#61B846" />
                                : <Ionicons name="md-home-outline" size={24} color="black" />
                        } else if (route.name === 'Cart') {
                            return focused ? <Ionicons name="cart" size={24} color="#61B846" />
                                : <Ionicons name="cart-outline" size={24} color="black" />
                        } else if (route.name === 'Account') {
                            return focused ? <MaterialCommunityIcons name="account-circle" size={24} color="#61B846" />
                                : <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
                        }
                    },
                    tabBarActiveTintColor: '#61B846',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <UserTab.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <UserTab.Screen options={{ headerShown: false }} name="Cart" component={Cart} />
                <UserTab.Screen options={{ headerShown: false }} name="Account" component={Account} />
            </UserTab.Navigator>
        </>
    );
}
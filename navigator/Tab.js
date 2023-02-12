import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHome from '../src/components/AdminHome';
import AddItems from '../src/components/AddItems';
import AdminAccount from '../src/components/AdminAccount';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ user }) {

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'Home') {
                            return focused ? <Ionicons name="md-home" size={24} color="#61B846" />
                                : <Ionicons name="md-home-outline" size={24} color="black" />
                        } else if (route.name === 'Add Items') {
                            return focused ? <AntDesign name="pluscircle" size={24} color="#61B846" />
                                : <AntDesign name="pluscircleo" size={24} color="black" />
                        } else if (route.name === 'Account') {
                            return focused ? <MaterialCommunityIcons name="account-circle" size={24} color="#61B846" />
                                : <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
                        }
                    },
                    tabBarActiveTintColor: '#61B846',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen options={{ headerShown: false }} name="Home" component={AdminHome} />
                <Tab.Screen options={{ headerShown: false }} name="Add Items" component={AddItems} />
                <Tab.Screen options={{ headerShown: false }} name="Account" component={AdminAccount} />
            </Tab.Navigator>
        </>
    );
}
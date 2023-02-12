import TabNavigator from '../navigator/Tab';
import UserTabNavigator from '../navigator/UserTab';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminOrders from './screens/AdminOrders';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Loader from './components/Loader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { auth, db, doc, onAuthStateChanged, getDoc } from '../firebase/firebase'
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

const Main = () => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => onAuthStateChanged(auth, async (user) => {
        if (user && user?.email === 'admin@gmail.com') {
            setLoader(false)
            const docRef = doc(db, "adminData", '1oDXxQB6i1rvFw6HzwDp');
            const docSnap = await getDoc(docRef);
            let userData = JSON.stringify(user)
            dispatch({ type: 'USER_DATA', fullName: docSnap.data().name, payload: userData });
            setUser(user)
        }
        else if (user) {
            const uid = user.uid;
            setUser(user)
            let userData = JSON.stringify(user)
            dispatch({ type: 'USER_DATA', payload: userData });
            setLoader(false)
        } else {
            setUser(null)
            setLoader(false)
        }
    }), [])

    if (loader) return <Loader flag={loader} />

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    {user && user?.email === 'admin@gmail.com' ?
                        <>
                            <Stack.Screen name="Admin" options={{ headerShown: false }} component={TabNavigator} />
                            <Stack.Screen name="AdminOrders" options={{ headerShown: false }} component={AdminOrders} />
                        </>
                        : user ?
                            <>
                                <Stack.Screen name="User" options={{ headerShown: false }} component={UserTabNavigator} />
                                {/* <Stack.Screen name="AdminOrders" options={{ headerShown: false }} component={AdminOrders} /> */}
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                                <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
                            </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider >
    )
}

export default Main
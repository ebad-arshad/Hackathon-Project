import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux';

const AdminNav = ({ navigation, goBack, unknown }) => {

    const user = useSelector(state => state.user)

    return (
        <SafeAreaView className='flex-row border-b-2 border-gray-300 py-4 px-4 items-center justify-between'>
            <View className='flex-row items-center'>
                {goBack &&
                    <TouchableOpacity onPress={() => {
                        unknown ? navigation.goBack()
                            :
                            navigation.navigate('Home')
                    }}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    </TouchableOpacity>
                }
                <View className='w-14 h-14'>
                    <ProfileImage />
                </View>
                <View className='ml-2'>
                    <Text className='text-[#024F9D] font-bold text-lg'>{user?.fullName}</Text>
                    <Text className='text-[#61B846] font-bold text-lg'>Admin</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AdminOrders')}>
                <FontAwesome5 name="list-alt" size={24} color={unknown ? '#61B846' : 'black'} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AdminNav
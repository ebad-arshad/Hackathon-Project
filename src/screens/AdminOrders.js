import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React from 'react'
import AdminNav from '../components/AdminNav'
import OrderItem from '../components/OrderItem'

const AdminOrders = ({ navigation }) => {
    return (
        <SafeAreaView className='h-screen'>
            <AdminNav unknown={true} navigation={navigation} goBack={true} />
            <View className='p-10 mb-10'>
                <Text className='text-[#024F9D] font-bold text-lg mb-10 ml-3'>Orders</Text>
                <ScrollView className='h-[500px] pr-4'>
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default AdminOrders
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const AllProductItem = ({ image, productName, productWieght, price }) => {
    return (
        <TouchableOpacity activeOpacity={.6} className='my-2'>
            <View className='border-[1px] px-2 py-2 border-[#61B846] rounded-lg flex-row items-center'>
                <View className='w-24'>
                    <Image className='w-full' resizeMode='contain' source={require('../assets/images/apple.png')} />
                </View>
                <View className='ml-2'>
                    <Text className='text-lg text-[#61B846] font-bold'>{productName}</Text>
                    <Text className='text-sm text-gray-500'>{productWieght}</Text>
                </View>
                <Text className='ml-auto text-gray-500'>${price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AllProductItem
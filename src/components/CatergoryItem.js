import { View, Text, Image } from 'react-native'
import React from 'react'

const CatergoryItem = ({ image, name }) => {
    return (
        <View className='flex-row items-center border-[#61B846] border-[1px] rounded-xl w-full my-1'>
            <View className='w-14 h-14 justify-center mx-4'>
                <Image className='w-full h-full' resizeMode='contain' source={{ uri: image}} />
            </View>
            <Text className='text-[#61B846] font-bold text-sm'>{name}</Text>
        </View>
    )
}

export default CatergoryItem
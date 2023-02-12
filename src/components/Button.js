import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ btnFunc, text, noMargin }) => {
    return (
        <View className={!noMargin ? `pt-8` : ''}>
            <TouchableOpacity
                onPress={btnFunc}
                className='w-full rounded-xl bg-[#024F9D] p-4'
            >
                <Text className='text-white text-center font-bold'>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button
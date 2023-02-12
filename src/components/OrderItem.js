import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'

const OrderItem = () => {
    const [checked, setChecked] = React.useState('first');
    return (
        <View className='mb-4 border-b-2 border-gray-300'>
            <Text className='font-bold text-lg'>Ebad Arshad</Text>
            <View className='flex-row justify-between'>
                <Text className='text-sm font-semibold text-[12px]'>Just Now - Pending</Text>
                <Text className='text-sm font-semibold text-[12px]'>03180127825</Text>
            </View>
            <View className=''>
                <Text className='font-light text-gray-400 text-[12px]'>2 x ITEM NAME</Text>
                <Text className='font-light text-gray-400 text-[12px]'>3 x ITEM NAME</Text>
            </View>
            <View className='flex-row justify-between my-1'>
                <Text className='font-bold'>Total</Text>
                <Text className='font-bold text-[#61B846]'>$ 185.00</Text>
            </View>
            <View>
                <View className='flex-row justify-between'>

                    <View className='items-start'>
                        <View className='flex-row items-center'>
                            <Text className='w-20'>
                                Pending
                            </Text>
                            <RadioButton
                                value="first"
                                color='#61B846'
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='w-20'>
                                In-Progress
                            </Text>
                            <RadioButton
                                value="second"
                                color='#61B846'
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                        </View>
                    </View>
                    <View className='items-end'>
                        <View className='flex-row items-center'>
                            <Text className='w-20'>
                                Delivered
                            </Text>
                            <RadioButton
                                value="third"
                                color='#61B846'
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('third')}
                            />
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='w-20'>
                                Canceled
                            </Text>
                            <RadioButton
                                value="fourth"
                                color='#61B846'
                                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('fourth')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default OrderItem
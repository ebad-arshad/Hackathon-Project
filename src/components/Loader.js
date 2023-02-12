import { View, Image } from 'react-native'
import React from 'react'

const Loader = ({ flag }) => {
    return flag ? <View className='absolute z-10 w-screen h-screen bg-black/20 items-center justify-center'>
        <Image className='w-full' resizeMode='contain' source={require('../assets/images/loader.gif')} />
    </View>
        : null
}

export default Loader
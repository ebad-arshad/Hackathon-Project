import { Image } from 'react-native'
import React from 'react'

const ProfileImage = () => {
    return (
        <Image className='w-full h-full' resizeMode='contain' source={require('../assets/images/user.png')} />
    )
}

export default ProfileImage
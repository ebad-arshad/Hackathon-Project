import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CatergoryItem from './CatergoryItem'
import Button from './Button'
import { auth, signOut } from '../../firebase/firebase'
import Loader from '../components/Loader'

const AllCategories = ({ allCategories }) => {

    const [loader, setLoader] = useState(false);

    const logOutBtn = () => {
        setLoader(true)
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    return (
        <>
            <Loader flag={loader} />
            <View className='mr-auto'>
                <Text className='font-bold text-xl my-2 text-[#024F9D]'>All Categories</Text>
            </View>
            <ScrollView className='w-full h-[160px]'>
                {
                    allCategories.map((item, index) => {
                        return (
                            <CatergoryItem key={index} image={item.categoryimageURL} name={item.categoryName} />
                        )
                    })
                }
            </ScrollView>
            <View className='w-full'>
                <Button text='Logout' btnFunc={logOutBtn} />
            </View>
        </>
    )
}

export default AllCategories
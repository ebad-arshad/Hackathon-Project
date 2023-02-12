import { View, Text } from 'react-native'
import React from 'react'
import AdminNav from './AdminNav'
import Form from './Form'

const AddItems = ({ navigation }) => {
  return (
    <>
      <AdminNav goBack={true} navigation={navigation} />
      <View className='p-10'>
        <Text className='text-[#024F9D] font-bold text-lg mb-2 ml-3'>Add New Item</Text>
        <Form />
      </View>
    </>
  )
}

export default AddItems
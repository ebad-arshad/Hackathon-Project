import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { db, doc, setDoc, query, onSnapshot, updateDoc, collection } from '../../firebase/firebase'
import Button from './Button';


// 024F9D
// 61B846
const Home = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "allCategory"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAllCategories([])
      querySnapshot.forEach((doc) => {
        setAllCategories(e => [...e, doc.data()]);
      });
    });
    const q2 = query(collection(db, "allProducts"));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      setAllProducts([])
      querySnapshot.forEach((doc) => {
        setAllProducts(e => [...e, doc.data()]);
      });
      return () => { unsubscribe(); unsubscribe2() }
    });
  }, [])


  return (
    <SafeAreaView className='px-10'>
      <View className='mt-4 flex-row items-center justify-between'>
        <View>
          <Text className='font-bold text-xl text-[#61B846]'>SAYLANI WELFARE</Text>
          <Text className='font-bold text-sm text-[#024F9D]'>DISCOUNT STORE</Text>
        </View>
        <FontAwesome5 name="shopping-cart" size={24} color="black" />
      </View>
      <View className='w-full'>
        <Image className='w-full' resizeMode='contain' source={require('../assets/images/slider.png')} />
      </View>
      <View>
        <TextInput
          keyboardType='text'
          placeholder='Search by product name'
          left={<TextInput.Icon icon='magnify' />}
        />
      </View>
      <View>
        <Text className='font-bold text-md my-2'>Shop by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='h-[100px]'>
          {
            allCategories.map((category, index) => (
              <TouchableOpacity className='mr-2'>
                <View key={index} className='w-[140px] h-[80px]'>
                  <View className='w-full py-3  border-[1px] border-[#61B846] rounded-2xl'>
                    <Image className='w-full h-full' resizeMode='contain' source={{ uri: category.categoryimageURL }} />
                  </View>
                  <Text className='text-center text-[#61B846] font-bold'>{category.categoryName}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <ScrollView>
        <View className='flex-row border'>
          <View className='flex-[.2] h-full'>
            {console.log(allProducts)}
            <Image className='w-full h-full' resizeMode='contain' source={{ uri: allProducts.imageURL }} />
          </View>
          <View className='flex-row'>
            <Text className='font-bold'>Meat</Text>
            <Text className='font-bold'>Price</Text>
          </View>
          <View className='flex-row'>
            <Text>
              This is product description
            </Text>

          </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Home
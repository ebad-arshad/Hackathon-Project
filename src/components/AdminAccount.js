import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileImage from './ProfileImage'
import { TextInput } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Button from './Button'
import AllCategories from './AllCategories'
import { uid } from 'uid'
import UploadPicture from '../components/UploadPicture'
import { db, doc, setDoc, query, onSnapshot, updateDoc, collection } from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'

const AdminAccount = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const q = query(collection(db, "allCategory"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAllCategories([])
      querySnapshot.forEach((doc) => {
        setAllCategories(e => [...e, doc.data()]);
      });
    });
    return () => unsubscribe()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateName = async () => {
    if (!fullName) return;
    const washingtonRef = doc(db, "adminData", '1oDXxQB6i1rvFw6HzwDp');
    try {
      await updateDoc(washingtonRef, {
        name: fullName
      });
      dispatch({ type: 'UPDATE_NAME', fullName: fullName })
      setFullName('')
    } catch (error) {
      console.log(error);
    }

  }

  const addCategory = async () => {
    let newID = uid(32);
    let path = 'categoryimages'
    let convertingBlob = await (await fetch(image)).blob()
    const imageURL = await UploadPicture(convertingBlob, newID, path)
    await setDoc(doc(db, "allCategory", newID), {
      categoryName: category,
      categoryimageURL: imageURL,
      uid: newID
    });
    setCategory('')
    setImage(null)
  }

  return (
    <>
      <ScrollView>
        <SafeAreaView className='px-10 items-center space-y-1'>
          <Text className='font-bold text-[#024F9D] text-2xl text-center py-4'>Settings</Text>
          <View className='w-24 h-24 items-center '>
            <ProfileImage />
          </View>
          <View className='w-full'>
            <TextInput
              className=' mt-2 rounded-t-lg'
              placeholder='Update Full Name'
              keyboardType='text'
              placeholderTextColor='#7e8a9d'
              mode='flat'
              autoCapitalize='none'
              textColor='#1f3253'
              value={fullName}
              selectionColor='#024F9D'
              onChangeText={e => setFullName(e)}
              right={<TextInput.Icon icon='check' onPress={updateName} iconColor='#024F9D' />}
            />
          </View>
          <View className='w-full'>
            <TouchableOpacity onPress={pickImage} className='items-center justify-center w-full h-24 mt-2 rounded-lg bg-[#D9D9D9]'>
              <FontAwesome className='z-10' name="camera" size={44} color="gray" />
            </TouchableOpacity>
          </View>
          <View className='w-full flex-row items-center justify-between'>
            <TextInput
              keyboardType='text'
              mode='outlined'
              placeholder='New category name'
              className='border-0 mb-[6px] items-center bg-[#D9D9D9] rounded-lg flex-1 mr-2'
              placeholderTextColor='#7e8a9d'
              autoCapitalize='none'
              textColor='#1f3253'
              value={category}
              selectionColor='#024F9D'
              onChangeText={e => setCategory(e)}
            />
            <Button btnFunc={addCategory} text='ADD' noMargin={true} />
          </View>
          <AllCategories allCategories={allCategories} />
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

export default AdminAccount
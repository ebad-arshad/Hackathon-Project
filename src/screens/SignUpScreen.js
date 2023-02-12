import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, createUserWithEmailAndPassword, db, setDoc } from '../../firebase/firebase'
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';


const SingUpScreen = ({ navigation }) => {

  const [signUpData, setSignUpData] = useState({})
  const [formError, setFormError] = useState(false)
  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const nameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;

  const signUpBtn = () => {
    if (!signUpData.email || !signUpData.password || !signUpData.fullName || !signUpData.contact) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    };
    if (!emailRegex.test(signUpData.email) || !passwordRegex.test(signUpData.password) || !nameRegex.test(signUpData.fullName.trim()) || !signUpData.contact) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    };
    setLoader(true)
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((res) => {
        dispatch({
          type: 'SIGN_UP_SUCCESS', uid: res.user.uid, payload: {
            fullName: signUpData.fullName,
            email: signUpData.email,
            contact: signUpData.contact,
            password: signUpData.password
          }
        })
      }
      )
      .catch((error) => setLoader(false));
  }

  return (
    <ScrollView>
      <Loader flag={loader} />
      <SafeAreaView className='flex-row items-center h-screen bg-white '>

        <View className='flex-1 space-y-3 px-10'>

          <View className='mt-10 items-center'>
            <Text className='font-bold text-3xl text-[#61B846]'>SAYLANI WELFARE</Text>
            <Text className='font-bold text-lg text-[#024F9D]'>ONLINE DISCOUNT STORE</Text>
          </View>

          <View>
            <View className='flex-row relative'>
              <Input placeholder='Full Name' type='text' icon='account-supervisor-circle' onChange={setSignUpData} data='fullName' />
            </View>
            <View className='flex-row relative'>
              <Input placeholder='Email' type='email-address' icon='email' onChange={setSignUpData} data='email' />
            </View>
            <View className='flex-row relative'>
              <Input placeholder='Contact' type='number-pad' icon='phone-in-talk' onChange={setSignUpData} data='contact' />
            </View>
            <View className='flex-row relative'>
              <Input placeholder='Password' type='visible-password' onChange={setSignUpData} data='password' />
            </View>
          </View>

          {formError && <Text className='text-red-600'>*Email, Full name, Conact or Password incorrect</Text>}

          <Button btnFunc={signUpBtn} text='Sign Up' />

          <View className='flex-row items-center justify-center text-[#7e8a9d] mt-4 gap-1 '><Text>Joined us before?</Text><TouchableOpacity><Text onPress={() => navigation.navigate('Login')} className='text-[#024F9D] font-bold'>Login</Text></TouchableOpacity></View>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SingUpScreen
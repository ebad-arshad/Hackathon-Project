import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, signInWithEmailAndPassword } from '../../firebase/firebase'
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {

  const [loginData, setLoginData] = useState({})
  const [formError, setFormError] = useState(false)
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()


  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const loginBtn = () => {
    if (!loginData.email || !loginData.password) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    };
    if (!emailRegex.test(loginData.email) || !passwordRegex.test(loginData.password)) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    };
    setLoader(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {
      })
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
              <Input placeholder='Email' type='email-address' icon='email' onChange={setLoginData} data='email' />
            </View>
            <View className='flex-row relative'>
              <Input placeholder='Password' type='visible-password' onChange={setLoginData} data='password' />
            </View>
          </View>

          {formError && <Text className='text-red-600'>*Email or Password incorrect</Text>}

          <TouchableOpacity>
            <Text className='ml-auto font-bold my-2 text-[#024F9D]'>Forget Password?</Text>
          </TouchableOpacity>

          <Button btnFunc={loginBtn} text='Sign In' />

          <View className='flex-row items-center justify-center text-[#7e8a9d] mt-4 gap-1 '><Text>Don't have an account ?</Text><TouchableOpacity><Text onPress={() => navigation.navigate('SignUp')} className='text-[#024F9D] font-bold'>Register</Text></TouchableOpacity></View>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginScreen
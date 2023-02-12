import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'

const Input = ({ placeholder, type, icon, onChange, data }) => {

    const [eye, setEye] = useState(true)

    return (
        <TextInput
            className='flex-1 mt-4 rounded-t-lg'
            placeholder={placeholder}
            placeholderTextColor='#7e8a9d'
            mode='flat'
            keyboardType={type}
            secureTextEntry={type === 'visible-password' ? eye : false}
            autoCapitalize='none'
            textColor='#1f3253'
            selectionColor='#024F9D'
            right={type === 'visible-password' ? <TextInput.Icon onPress={() => setEye(e => !e)} icon={!eye ? 'eye-off' : 'eye'} /> : <TextInput.Icon icon={icon} />}
            onChangeText={text => onChange(e => { return { ...e, [data]: text } })}
        />
    )
}

export default Input
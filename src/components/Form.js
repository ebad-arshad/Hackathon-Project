import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import { db, collection, query, where, onSnapshot, setDoc, doc } from '../../firebase/firebase'
import UploadPicture from '../components/UploadPicture';
import { uid } from 'uid';

const Form = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        const q = query(collection(db, "allCategory"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setItems([])
            querySnapshot.forEach((doc) => {
                setItems(e => [...e, { label: doc.data().categoryName, value: doc.data().categoryName }]);
            });
        });
        return () => unsubscribe()
    }, [])

    const [image, setImage] = useState(null);

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


    const addProduct = async () => {
        let newID = uid(32);
        let path = 'productImages'
        productData.uid = newID;
        let convertingBlob = await (await fetch(image)).blob()
        const imageURL = await UploadPicture(convertingBlob, newID, path)
        productData.imageURL = imageURL;
        await setDoc(doc(db, "allProducts", newID), productData);
        setProductData({});
        setImage(null);
        setValue(null);
    }

    return (
        <View className='space-y-2'>
            <TouchableOpacity onPress={pickImage} className='items-center justify-center w-full h-32 rounded-lg bg-[#D9D9D9]'>
                <FontAwesome className='z-10' name="camera" size={44} color="gray" />
            </TouchableOpacity>
            <TextInput keyboardType='text' placeholder='Item Name'
                value={productData.itemName}
                onChangeText={e => setProductData(text => { return { ...text, itemName: e } })}
                className='border-0 bg-[#D9D9D9] p-3 rounded-lg'
            />
            <DropDownPicker
                className='border-0 bg-[#D9D9D9]'
                placeholder='Select Category'
                open={open}
                value={value}
                items={JSON.stringify([]) === JSON.stringify(items) ? [] : items}
                onSelectItem={e => setProductData(text => { return { ...text, category: e.value } })}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <TextInput keyboardType='text' placeholder='Describe this item'
                className='border-0 bg-[#D9D9D9] p-3 rounded-lg'
                value={productData.comment}
                onChangeText={e => setProductData(text => { return { ...text, comment: e } })}
                multiline={true}
            />
            <View className='flex-row items-center justify-between'>
                <Text id='unitName'>Unit Name: </Text>
                <TextInput keyboardType='text'
                    className='border-0 bg-[#D9D9D9] p-3 rounded-lg w-[200px]'
                    label='unitName'
                    value={productData.unitName}
                    onChangeText={e => setProductData(text => { return { ...text, unitName: e } })}
                    placeholder='Pcs. / Kg / dozen'
                />
            </View>
            <View className='flex-row items-center justify-between'>
                <Text>Unit Price: </Text>
                <TextInput
                    className='border-0 bg-[#D9D9D9] p-3 rounded-lg w-[200px]'
                    value={productData.unitPrice}
                    onChangeText={e => setProductData(text => { return { ...text, unitPrice: e } })}
                    label='unitPrice'
                    keyboardType='number-pad'
                    placeholder='$3.22'
                />
            </View>
            <Button btnFunc={addProduct} text='Add Product' />
        </View>
    )
}

export default Form
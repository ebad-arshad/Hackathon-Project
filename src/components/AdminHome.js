import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AllProductItem from './AllProductItem'
import AdminNav from './AdminNav'
import { collection, query, where, onSnapshot, db } from "../../firebase/firebase";
const AdminHome = ({ navigation }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const q = query(collection(db, "allProducts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setProducts([])
            querySnapshot.forEach((doc) => {
                setProducts(e => [...e, doc.data()])

            });
        });
        return () => unsubscribe()
    }, [])

    return (
        <>
            <AdminNav navigation={navigation} />
            <View className='p-10'>
                <Text className='text-[#024F9D] font-bold text-lg mb-10 ml-3'>All Products</Text>
                <ScrollView className='px-3'>
                    {products.length === 0 ? <Text>No products found</Text> :
                        products.map((product, i) => {
                            return <AllProductItem key={i} image={product.imageURL} productName={product.itemName} productWieght={product.unitName} price={product.unitPrice} />
                        })
                    }
                </ScrollView>
            </View>
        </>
    )
}

export default AdminHome
// import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Activity from '../component/Activity'

const ListProduct = () => {
  const { height, width } = Dimensions.get('screen')
  const [ProductData, setProductData] = useState<any>([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const jsonData = await response.json();
        console.log("response: " + JSON.stringify(jsonData));

        setProductData(jsonData.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleClick = (id: number) => {
    //@ts-ignore
    navigate.navigate('ViewProduct', { id })
  };
  const navigate = useNavigation()
  return (
   <>
   {Loading?<Activity/>: <View style={{ height: height, alignItems: 'center', width: width,backgroundColor:'#000' }}>
      <FlatList
        data={ProductData}
        renderItem={({ item, index }) => <>
          <TouchableOpacity
            onPress={() => handleClick(item.id)}
            style={{ width: width / 1.03, height: height / 7, margin: 5, borderRadius: 10, borderWidth: 1, borderColor: 'grey' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: width / 4, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: '90%', height: '83%', borderRadius: 50, }}
                />
              </View>
              <View style={{ width: width }}>
                <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '5%', marginTop: '2%' ,color:'#fff'}}>{item.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: '5%', color: '#fff' }}>Rs.{item.price}</Text>
                  <Text style={{ fontSize: 20, fontWeight: '600', color: 'red', marginLeft: '2%', }}>{`${'(' + item.discountPercentage + '%) off'}`}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: 'orange', marginLeft: '4%' }}>{`${item.rating}*/5`}</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '500', marginLeft: '5%', marginTop: '2%', maxWidth: '64%',color:'#fff' }}>{`${(item.description).substring(0, 60) + '...'}`}</Text>

              </View>
            </View>
          </TouchableOpacity>

        </>
        }
      />
    </View>}
   </>
  )
}

export default ListProduct

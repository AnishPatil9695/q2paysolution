import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import Activity from '../component/Activity';

const ViewProduct = ({ route }: any) => {
  const { height, width } = Dimensions.get('screen')
  const [Detail, setDetail] = useState<any>()
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${route.params.id}`);
        const jsonData = await response.json();
        setDetail(jsonData)
        console.log("response: " + JSON.stringify(jsonData));
        // setProductData(jsonData.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }: any) => (
    <View style={[styles.imageContainer, { width: width }]}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <>
    {Loading?<>
    <Activity/>
    </>:<View style={{ backgroundColor: '#000' }}>
      <FlatList
        data={Detail?.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        pagingEnabled
      />
      <View style={{height:'70%'}}>
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700', marginLeft: '3%' ,marginTop:'3%'}}>
          {Detail?.title}
        </Text>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600', marginLeft: '3%' ,marginTop:'3%'}}>
         by {Detail?.brand}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '600', margin: '3%', color: '#fff' }}>Rs. {Detail?.price} /-</Text>
          <Text style={{ fontSize: 20, fontWeight: '600', color: 'red', marginLeft: '1%', }}>{`${'('+Detail?.discountPercentage + '%) off'}`}</Text>
        </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: 'orange', marginLeft: '3%' }}>{`Rating ( ${Detail?.rating}*/5 )`}</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#40E0D0', marginLeft: '5%' }}>{`Only ${Detail?.stock} left in stock`}</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#0FFF50', marginLeft: '3%',marginTop:'2%' }}>category {`${'('+Detail?.category+')'}`}</Text>
          
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff', marginLeft: '3%',marginTop:'2%' }}>{Detail?.description}</Text>
      </View>
    </View>}
    
    </>
  )
}

export default ViewProduct

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 10,
  },
  imageContainer: {
    height: 200,
    borderRadius: 10,
    // marginHorizontal: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
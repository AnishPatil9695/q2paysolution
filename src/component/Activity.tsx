import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Activity = () => {
  return (
    <View style={{height:'100%',justifyContent:'center'}}>
        <ActivityIndicator size="large" color="purple" />
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({})
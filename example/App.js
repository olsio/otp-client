import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import OTP from 'otp-client'

export default class App extends React.Component {
  render() {
    const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
    const otp = new OTP(secret)
    const token = otp.getToken()

    return (
      <View style={styles.container}>
        <Text />
        <Text>{token}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


import React from 'react'
import { View, Text } from 'tamagui'

const Settings = () => {
  return (
    <View style={styles.container}
    >
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
}
import React from 'react';
import { View, Text } from 'react-native';
import {withTheme} from 'react-native-paper'


type Props = {
  theme?: {colors: object, dark: boolean}
}

const HomeScreen: React.FC<Props> = (props) => {

  const {
    theme: {dark, colors}
  } = props

  console.log('theme colors is: ', colors)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{}}>Home Screen</Text>
    </View>
  );
}

export default withTheme(HomeScreen)
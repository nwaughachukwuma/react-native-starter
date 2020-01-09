import React from 'react';
import { View, Text } from 'react-native';
import {withTheme} from 'react-native-paper'


type Props = {
  theme: { colors?: any }
}

const HomeScreen: React.FC<Props> = (props) => {

  const {
    theme: {colors}
  } = props

  console.log('theme colors is: ', colors)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{color: colors.text}}>Home Screen</Text>
    </View>
  );
}

// @ts-ignore
export default withTheme(HomeScreen)
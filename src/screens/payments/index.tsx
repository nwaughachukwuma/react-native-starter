import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {withTheme} from 'react-native-paper'
import {defaultStyles} from 'utils'


type Props = {
  theme: { colors?: any }
}

const styles = StyleSheet.create({
  container: { 
    ...defaultStyles().container
  }
})

const PaymentsScreen: React.FC<Props> = (props) => {

  const {
    theme: {colors}
  } = props

  return (
    <View style={styles.container}>
      <Text style={{color: colors.text, fontSize: 20}}>Payments Screen</Text>
    </View>
  );
}

// @ts-ignore
export default withTheme(PaymentsScreen)
import React from 'react';
import { 
    ScrollView, 
    SafeAreaView, 
    StyleSheet 
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';


type Props = {

}

export const CustomDrawerComponent: React.FC<Props|any> = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawerComponent
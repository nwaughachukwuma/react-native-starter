import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  Platform
} from 'react-native'
import {withTheme, Avatar, Text, Switch, Divider} from 'react-native-paper'
import {verticalScale, scale} from 'react-native-size-matters'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from 'utils/assets'
import {SectionItem, SectionHeader} from './sections'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import uuidv4 from 'uuid/v4'


type Props = {
  theme: {colors?: any, dark?: any}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    // marginBottom: scale(10),
  },
  imageBgContainer: {
    top: scale(1),
    paddingLeft: scale(15),
    height: 'auto'
  },
  avatarContainer: {
    marginTop: scale(10),
    marginBottom: scale(10)
  },
  userCred: {
    marginBottom: scale(10),
  },
  username: {
    fontWeight: '500', 
    fontSize: scale(20),
    color: '#fff'
  },
  useremail: {
    color: '#fff'
  },
  listFooter: {
    left: 0,
    bottom: '0',
  },
  drawerFooter: {
    elevation: 1,
    left: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        paddingBottom: verticalScale(10),
      },
      android: {
        paddingBottom: getBottomSpace() + verticalScale(10),
      }
    }),
    paddingTop: verticalScale(10)
  }
});

const menuItems = [
  { label: "Profile", icon: "person", key: 0, route: 'Profile' },
  { label: "Payment", icon: "dollar", key: 1, route: 'Payments' },
  { label: "Settings and Privacy", icon: "spinner-cog", key: 2, route: 'Settings' }
];

export const CustomDrawerComponent: React.FC<Props | any> = props => {
  
  useEffect(() => {
    // use an IIFE
    (async function runAuth() {
      try {
        await auth().signInAnonymously();
      } catch (e) {
        switch (e.code) {
          case 'auth/operation-not-allowed':
            console.log('Enable anonymous in your firebase console.');
            break;
          default:
            console.error(e);
            break;
        }
      }
    })()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSection
        {...props}
        // avatarBackground={avatarBackground}
        onPress={() => props.navigation.navigate("Home")}
      />
      <MemoizedMenuSection {...props} />
      <DrawerFooter {...props}/>
    </SafeAreaView>
  )
};

export const ProfileSection: React.FC<Props | any> = (props) => {
  const {
    theme: { colors },
    onPress,
    avatar=null,
    userName='James Ndika',
    userEmail='admin@eventsmag.com'
  } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={styles.profileContainer}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={{ uri: images.photo_bg }}
          style={styles.imageBgContainer}
        >
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={scale(60)}
              source={{ uri: avatar? avatar : images.profile_photo }}
            />
          </View>
          <View style={styles.userCred}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.useremail}>{userEmail}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const SwitchComponent = (props: any) => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean|any>(false)
  useEffect(() => {
    console.log('am re-rendered')
    setIsSwitchOn(props.dark)
  }, [])
  
  const valueChanged = useCallback(
    async (value) => {
      props.toggleTheme();
      setIsSwitchOn(value);
    },
    [isSwitchOn]
  )
  
  return (
    <Switch
      {...props}
      value={isSwitchOn}
      onValueChange={valueChanged}
      style={{marginTop: 5, marginRight: 10}}
    />
  )
}

export const MenuSection: React.FC<Props|any> = (props) => {
  const [drawerIndex, setDrawerIndex] = useState<number|any>(null)
  const {
    navigation,
    theme: { colors }
  } = props;

  const _setDrawerItem = useCallback(
    (index: number, route = null) => {
      setDrawerIndex(index);
      if (route) {
        navigation.navigate(route);
      }
    }, []
  );

  return (
    <FlatList 
      contentContainerStyle={{flex: 1}}
      style={{flex: 1}}
      // ItemSeparatorComponent={(props) => <Divider {...props}/>}
      data={menuItems}
      ListHeaderComponent={<SectionHeader {...props} title="Menu" />}
      keyExtractor={(item, index) => uuidv4()}
      renderItem={({item, index}) => (
        <SectionItem
          {...props}
          key={item.key}
          onPress={() => _setDrawerItem(index, item.route)}
          iconColor={colors.text}
          iconLeft={item.icon}
          label={item.label}
          labelStyle={{
            fontWeight: item.key === drawerIndex ? "bold" : "normal"
          }}
        />
      )}
    />
  );
}
// memoize menu section
const MemoizedMenuSection = React.memo(MenuSection)

const DrawerFooter: React.FC<Props|any> = (props) => {
  const {
    navigation,
    theme: {dark, colors},
    toggleTheme,
  } = props

  const exitApp = (route: string) => {
    if (route) {
      navigation.navigate(route);
    }
  }

  return (
    <View style={styles.drawerFooter}>
      <Divider {...props}/>
      <SectionItem
        label={"Dark Mode"}
        onPress={toggleTheme}
        iconLeft={dark? "night-clear": 'day-sunny'}
        iconColor={colors.text}
        labelStyle={{color: colors.text, fontStyle: "italic"}}
      />
      <SectionItem
        label={'Logout'}
        onPress={() => exitApp('Welcome')}
        iconLeft={'arrow-left'}
        iconColor={colors.text}
        labelStyle={{color: colors.text}}
      />
    </View>
  )
}

export default withTheme(CustomDrawerComponent)
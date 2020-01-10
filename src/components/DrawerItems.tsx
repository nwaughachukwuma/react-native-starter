import React from 'react';
import { useState, useCallback, useEffect } from 'react'
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert
} from 'react-native'
import {withTheme, Avatar, Text, Switch} from 'react-native-paper'
import {scale} from 'react-native-size-matters'
import AsyncStorage from '@react-native-community/async-storage';
import {images} from 'utils'
import {SectionItem, SectionHeader} from './sections'


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
    top: scale(5),
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
  }
});

const menuItems = [
  { label: "Personal", icon: "user", key: 0, route: null },
  { label: "Feedback", icon: "user", key: 1, route: null }
];

export const CustomDrawerComponent: React.FC<Props | any> = props => (
  <View>
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <ProfileSection
            {...props}
            // avatarBackground={avatarBackground}
            // onPress={() => this.profileModal.open()} //* deprecated for now for time sake. Will work on it after release
            onPress={() => props.navigation.navigate("Home")}
          />
        <MemoizedMenuSection {...props} />
      </SafeAreaView>
    </ScrollView>
  </View>
);

export const ProfileSection: React.FC<Props | any> = (props) => {
  const {
    navigation,
    theme: { colors },
    // avatarBackground,
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
  // console.log('switch component props', props)
  useEffect(() => {
    setIsSwitchOn(props.dark)
  }, [])
  
  const valueChanged = useCallback(
    (value) => {
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
    theme: { dark, colors },
    toggleTheme,
    scene,
    onDriverDetailsPress
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
    <View>
      <SectionHeader {...props} title="Menu" />
      {menuItems.map((props, index) => (
        <SectionItem
          {...props}
          key={props.key}
          onPress={() => _setDrawerItem(index, props.route)}
          iconColor={colors.text}
          iconLeft={props.icon}
          label={props.label}
          labelStyle={[
            {
              fontWeight: props.key === drawerIndex ? "bold" : "normal"
            }
          ]}
        />
      ))}
      <SectionItem
        label={dark ? "Dark Mode" : "Dark Mode"}
        onPress={toggleTheme}
        iconLeft={dark? "moon": 'sun'}
        ItemRight={(ownProps: any) => <SwitchComponent dark={dark} toggleTheme={toggleTheme} {...ownProps} />}
        disablePress={true}
        iconColor={colors.text}
        labelStyle={[
          {
            color: colors.text,
            fontStyle: "italic"
          }
        ]}
      />
    </View>
  );
}

const MemoizedMenuSection = React.memo(MenuSection)

export default withTheme(CustomDrawerComponent)
import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import {withTheme, Avatar, Text} from 'react-native-paper'
import {scale} from 'react-native-size-matters'
import {images} from 'utils'


type Props = {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {

  },
  imageBgContainer: {
    top: scale(5),
    paddingLeft: scale(15),
    marginBottom: scale(10),
    height: 'auto'
  },
  avatarContainer: {
    top: scale(10),
    marginBottom: scale(15)
  },
  username: {
    fontWeight: '500', 
    fontSize: scale(20)
  }
});

const isIOS = Platform.OS === 'ios'

export const CustomDrawerComponent: React.FC<Props | any> = props => (
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
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
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
          <Text style={styles.username}>{userName}</Text>
          <Text>{userEmail}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

export default withTheme(CustomDrawerComponent)
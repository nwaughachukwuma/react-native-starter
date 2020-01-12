# React-Native-Starter
#### Start your next react native project with ease 🎉 💪

This repository is an opinionated starter for any React Native Project with needs for some or all of the following stack
- TypeScript
- Navigation Library
- Auth & State Management
- Database & Storage
- UI Library with inbuilt components and themes

![DarkMode](https://dl.dropbox.com/s/xtsj652vvlb0go3/mixed.png?dl=0=250x250)

### Note: 
1. RN-Starter is optimized for iOS and Android but has not been tested for other platforms such as Windows
2. Feel free to fork and use the project as you desire.
3. You can connect with me on twitter [@ChukwumaNwaugha](https://twitter.com/ChukwumaNwaugha) to share your experience in using the Starter or ideas about how to optimize it

### Installation:
- git clone https://github.com/nwaughachukwuma/react-native-starter <custom-project-name>
- cd custom-project-name
- yarn/npm install
- setup A project on [Firebase](https://firebase.google.com/?gclid=CjwKCAiApOvwBRBUEiwAcZGdGA8gxr9zjboPhMhZJ_3u7urjhBFygGULUVsxNasFqE8_vLSuVDPA6xoCURIQAvD_BwE). You can use [this guide](https://invertase.io/oss/react-native-firebase/quick-start/create-firebase-project) 
- add firebase to the app: 
  - for [ios](https://invertase.io/oss/react-native-firebase/quick-start/ios-firebase-credentials)
  - for [android](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials)
- add a .env file to abstract your secret credentials
- run the app: `react-native run-(ios|android)`


> See my other [starter project](https://github.com/nwaughachukwuma/eventsmag#installation) if you want to integrate Cloud Functions

This is an opinionated starter project based on my approach to building Hybrid Mobile Apps using React-Native and based on the tools I consider useful. I have chosen certain libraries over others because of the performance they bring to an App and the ease to quickly build prototypes from UI designs. Please find below a list of the integrations in use:

- React Native (v0.61.5)
- TypeScript
- React Navigation (V4): provides routing and navigation to React-Native apps. [React-Navigation](https://reactnavigation.org)
- React Native Paper (v3): a material design library for react native, providing reusable components and support for `dark mode`. [RN-Paper](https://github.com/callstack/react-native-paper)
- React Native Firebase (v6): a popular firebase library for react native, providing firebase integrations for RDB, storage, firestore, MLkit, cloud functions, cloud messaging, etc. [RNFirebase](https://github.com/invertase/react-native-firebase)
- React-Redux-Firebase (v3): a redux binding for firebase which provides wrappers for firebase auth, firestore, RDB, storage, etc.
- React-Native-Vector-Icons [RNVI](https://github.com/oblador/react-native-vector-icons)
- Redux Saga
- Reselect

The purpose of this starter is to provide React Native developers a ready-made kit with necessary integrations to start building their next big ideas. Please feel free to strip the project to your needs or suggest other relevant libraries/tools you think I should integrate.

## Todo
[ ] Testing with Jest and Enzyme


**Contributors**
- [Chukwuma Nwaugha](https://github.com/nwaughachukwuma)

#### 👏 ✌️


/**
 * @format
 */

import 'react-native-gesture-handler'; // this should be atop
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

AppRegistry.registerComponent(appName, () => App);

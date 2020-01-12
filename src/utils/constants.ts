import * as React from 'react';
import { Dimensions, Platform } from 'react-native'
//@ts-ignore
import {projectId, databaseURL, messagingSenderId, storageBucket,
    // @ts-ignore
    iosAppId, iosApiKey, androidAppId, androidApiKey
} from 'react-native-dotenv'


export const SCREEN_DIM = Dimensions.get('screen')

export const firebaseConfig = {
    projectId,
    databaseURL,
    messagingSenderId,
    storageBucket,
    ...Platform.select({ios: {
        appId: iosAppId,
        apiKey: iosApiKey
    }, android: {
        appId: androidAppId,
        apiKey: androidApiKey
    }})
}
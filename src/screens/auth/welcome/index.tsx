import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {withTheme} from  'react-native-paper'
import {defaultStyles} from 'utils'


type Props = {

}

const styles = StyleSheet.create({
    container: {
        ...defaultStyles().container
    }
})

export const Welcome: React.FC<Props|any> = (props) => {

    const {
        theme: {colors}
    } = props
    return (
        <View style={styles.container}>
            <Text style={{color: colors.text}}>
                Welcome to Events Magazine
            </Text>
        </View>
    )
}

export default withTheme(Welcome)
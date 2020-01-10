import * as React from 'react'
import { View } from 'react-native'
import { withTheme, Text, Divider } from 'react-native-paper'
import { defaultStyles, scaledStyles } from 'utils'


type Props = {
    theme: {colors?: any}
}

export const SectionHeader: React.FC<Props | any> = (props) => {

    const {
        navigation,
        theme: { colors },
        title
    } = props
    return (
        <View style={[scaledStyles.listSectionHeaderContainer, { backgroundColor: colors.background }]}>
            <Text style={[scaledStyles.listSectionTitle, {color: colors.text}]}>{title}</Text>
        </View>
    )
}

export default withTheme(SectionHeader)

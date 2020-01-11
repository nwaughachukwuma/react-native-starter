import * as React from "react";
import { useCallback, useEffect } from "react"
import { TouchableOpacity, View } from "react-native";
import { withTheme, Text, List } from "react-native-paper";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import Icons from 'react-native-vector-icons/Fontisto'


type FCProps = {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>
  theme: { dark?: any, colors?: any }
  containerStyle?: any
  labelStyle?: any
  iconColor?: any
  key?: any
  label?: string
  description?: string
  onPress?: () => void
  onLocalPress?: () => void;
  iconLeft: string
  iconRight?: string
  disablePress?: boolean
}

interface Props extends FCProps {
  ItemRight?: React.ComponentProps<any>
};

const SectionItem: React.FC<Props> = (props) => {
  const {
    navigation,
    theme: { dark, colors },
    containerStyle,
    labelStyle,
    iconColor,
    key,
    label,
    description,
    onPress,
    iconLeft,
    iconRight,
    disablePress,
    ItemRight
  } = props;

  let isLoadingTimeout: NodeJS.Timeout;
  let onPressTimeout: any;

  useEffect(() => {
    return () => {
      if (isLoadingTimeout) clearTimeout(isLoadingTimeout)
      if (onPressTimeout) clearTimeout(onPressTimeout)
    }
  }, [])

  const onLocalPress = useCallback(
    (onPressArg: any) => {
      onPressTimeout = setTimeout(onPressArg, 250);
    },
    []
  );

  return (
    <List.Item
      title={label}
      titleStyle={labelStyle}
      description={description && description}
      onPress={() => {
        if (onPress && !disablePress) return onLocalPress(onPress)
      }}
      style={[containerStyle, { paddingVertical: 0 }]}
      left={props => (
        <List.Icon
          {...props}
          icon={({ size, color }) => (
            <>
              <Icons
                name={iconLeft}
                size={size * 0.7}
                color={iconColor || colors.text}
              />
            </>
          )}
        />
      )}
      right={props =>
        ItemRight ? (
          <ItemRight {...props} />
        ) : iconRight ? (
          <List.Icon
            {...props}
            icon={({ size, color }) => (
              <Icons
                name={iconRight}
                size={size * 0.7}
                color={iconColor || colors.text}
              />
            )}
          />
        ) : null
      }
    />
  );
}

SectionItem.defaultProps = {
  iconLeft: 'user'
}
// @ts-ignore
export default withTheme(React.memo(SectionItem));

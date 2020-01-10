import React from "react";
import { useState, useCallback } from "react"
import { TouchableOpacity, View } from "react-native";
import { withTheme, Text, List } from "react-native-paper";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather'


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
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  const onLocalPress = useCallback(
    (onPressArg: any) => {
      //* basically timeout for animation
      setIsLoading(true);
      setTimeout(onPressArg, 100); //* reduce to 100 due to using TouchableOpacity
      setTimeout(() => setIsLoading(false), 1000);
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
              <Feather
                name={iconLeft}
                size={size * 0.8}
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
              <Feather
                name={iconRight}
                size={size * 0.8}
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

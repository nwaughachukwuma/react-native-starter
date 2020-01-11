import * as React from 'react';
import { Button } from 'react-native-paper';
import {
  NavigationScreenProp, 
  NavigationState, 
  NavigationParams
} from 'react-navigation'


type Props = {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    style?: object
    color?: string
    size?: number,
    mode?: string
}

// customize the button to your needs
export const FancyButton: React.FC<Props|any> = (props) => {
  return <Button 
      {...props} 
    />
}

FancyButton.defaultProps = {
  size: 20,
  mode: 'contained'
}

export default FancyButton
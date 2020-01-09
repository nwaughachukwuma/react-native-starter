import React from 'react';
import { Button } from 'react-native-paper';
import {
  NavigationScreenProp, 
  NavigationState, 
  NavigationParams
} from 'react-navigation'


type Props = {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    style?: object // {color: 'white}
    color?: string | null // filename
    size?: number,
    mode?: string
}

export const FancyButton: React.FC<Props|any> = (props) => {
  return <Button 
      theme={{ fonts: { medium: 'Open Sans' } }} 
      {...props} 
    />
}

FancyButton.defaultProps = {
  style: {},
  color: 'teal',
  size: 20,
  mode: 'contained'
}

export default FancyButton
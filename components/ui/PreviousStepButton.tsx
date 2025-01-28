import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    StyleProp,
    TextStyle,
  } from 'react-native';
  import { useState } from 'react';
import BackArrowSVG from '@/assets/svg/BackArrowSVG';
  
  type PreviousStepButtonProps = {
    onSubmit: (action: string) => void,
    action: string,
    styles?: StyleProp<ViewStyle> | StyleProp<TextStyle>
  };
  
  const PreviousStepButton = (props: PreviousStepButtonProps) => {
    const { onSubmit, action, styles } = props;
  
    const [isPressed, setIsPressed] = useState<boolean>(false);
  
    const onPressInHandler = () => {
      setIsPressed(true);
    };
  
    const onPressOutHandler = () => {
      setIsPressed(false);
      onSubmit(action);
    };
  
    return (
      <TouchableOpacity
        style={[defaultStyle.circle, styles, { backgroundColor: isPressed ? '#FB8F67' : '#FEDED2' }]}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        activeOpacity={1}
      >
        <BackArrowSVG />
      </TouchableOpacity>
    );
  }
  
  const defaultStyle = StyleSheet.create({
    circle: {
      width: 45,
      height: 45,
      borderRadius: 50,
      paddingTop: 11,
      paddingLeft: 10,
      cursor: 'pointer',
    },
  
  })
  
  export default PreviousStepButton;
  
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ViewStyle,
    StyleProp,
    TextStyle,
  } from 'react-native'
  
  type NextStepButtonProps = {
    isInputValidated: boolean
    onSubmit: (action: string) => void
    action: string
    caption: string
    activeOpacity: number
    styles?: StyleProp<ViewStyle> | StyleProp<TextStyle>
  }
  
  const NextStepButton = (props: NextStepButtonProps) => {
    const { isInputValidated, onSubmit, caption, activeOpacity, action, styles } =
      props
    const onPressHandler = () => {
      onSubmit(action)
    }
  
    return (
      <TouchableOpacity
        style={[defaultStyle.button, styles]}
        onPress={onPressHandler}
        activeOpacity={activeOpacity}
        disabled={!isInputValidated}
      >
        <Text style={[defaultStyle.btnText, styles]}>{caption}</Text>
      </TouchableOpacity>
    )
  }
  
  const defaultStyle = StyleSheet.create({
    button: {
      marginTop: 10,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: 'salmon',
      width: 300,
      height: 40,
      alignItems: 'center',
    },
    btnText: {
      fontSize: 18,
      color: 'salmon',
    },
  })
  
  export default NextStepButton

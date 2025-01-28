import { Text } from 'react-native'

type ErrorIndicatorProps = {
  errorMessage: string
  color: string
}

const ErrorIndicator = (props: ErrorIndicatorProps) => {
  return <Text style={{ color: `${props.color}` }}>{props.errorMessage}</Text>
}

export default ErrorIndicator
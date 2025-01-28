import { Text } from 'react-native'

type DataProps = {
  data: string
  color?: string
}

const Data = (props: DataProps) => {
  return (
    <Text style={{ color: props.color, fontWeight: 400 }}>{props.data}</Text>
  )
}

export default Data